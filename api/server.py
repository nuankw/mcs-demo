#!/usr/bin/env python3
from flask import (
    Flask,
    jsonify,
    request,
)
import uuid
from bson import ObjectId
from flask import session
from flask_pymongo import PyMongo, ASCENDING, DESCENDING
from flask_session import Session
from flask_cors import CORS

import torch
from transformers import AutoTokenizer
from model import Transformer
from scipy.special import softmax

import re
import string
import nltk
from nltk.util import ngrams

nltk.download('punkt')

from collections import Counter
import math

from datetime import datetime
from pytz import timezone
import logging
import os

from slack import WebClient
from slack.errors import SlackApiError

# Bot User OAuth Access Token
# get it at https://api.slack.com/apps/A01AUV60P3R/oauth?success=1
slack_token = os.environ.get('SLACK_API_TOKEN', '')
slack_client = WebClient(slack_token)

logger = logging.getLogger(__name__)

app = Flask(__name__, static_url_path='')
CORS(app)
app.secret_key = os.environ.get('APP_SECRET', 'asdf')

# Add mongo db settings for logging
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://0.0.0.0:27017/mcs2')
app.config["MONGO_URI"] = MONGO_URI
mongo = PyMongo(app)

# Initialize the flask session
SESSION_TYPE = 'mongodb'
SESSION_MONGODB = mongo.cx
SESSION_MONGODB_DB = 'mcs2'
SESSION_MONGODB_COLLECT = 'sessions'
SESSION_USE_SIGNER = True
app.config.from_object(__name__)
Session(app)

SYSTEMS = {
    'system_1': {
        'system_name': 'roberta',
        'model_name': 'roberta-large',
        'model_path': 'models/ep_68_stp_2.7k_acc_65.7452_roberta_large.pth',
        'num_cls': 2,
        'tokenizer': None,
        'device': None,
        'model': None,
    },
}

NUM_QUESTIONS = 5
MAX_VAL_VALUE = 2

MIN_SENTENCE_LENGTH = 7
N = 2 # N-gram
INTRA_PAIR_MIN_SAFE_SIMILARITY_SCORE = 0.7
INTRA_PAIR_MAX_SAFE_SIMILARITY_SCORE = 0.9
INTER_PAIR_MAX_SAFE_SIMILARITY_SCORE = 0.4

# Payment calculation
BASE_PER_SENTENCE_CREATED = 0.1
BONUS_PER_SENTENCE = 0.5 # default, read from url session (either 0.5 or 0.8)
REQUIRED_NUM_SENTENCES_TO_CREATE = 6 # 10

REQUIRED_NUM_SENTENCES_TO_VALIDATE = 10
BASE_PER_SENTENCE_TO_VALIDATE = 0.1

# LOCAL TEST ONLY - Start
LOCAL = os.environ.get('MCS2_HOST', '').lower() == 'localhost'
DUMMY_INFO = {
    'uid': str(uuid.uuid4()),
    'hit_id': 'hitX',
    'worker_id': 'workerX',
    'assignment_id': 'assignmentX',
    'scenario': 'sX',
    'domain': 'dX',
    'mode': 'creation',
    'bonus': '0.8',
}
if LOCAL:
    print("LOCAL TESTING, dummy variables:", DUMMY_INFO)


# LOCAL TEST ONLY - End

def tokenize(raw_sentence):
    """
        based on nltk.word_tokenize() but remove punctuations
    """
    tokens = nltk.word_tokenize(raw_sentence.lower())
    # filter out non-alpabetic words
    tokens = [token for token in tokens if any(letter in token for letter in string.ascii_lowercase)]
    return tokens


def jaccard_distance(a, b):
    """Calculate the jaccard distance between n-gram lists A and B"""
    a = set(a)
    b = set(b)
    return 1.0 * len(a & b) / len(a | b)


def cosine_distance(a, b):
    vec1 = Counter(a)
    vec2 = Counter(b)

    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])

    sum1 = sum([vec1[x] ** 2 for x in vec1.keys()])
    sum2 = sum([vec2[x] ** 2 for x in vec2.keys()])
    denominator = math.sqrt(sum1) * math.sqrt(sum2)

    if not denominator:
        return 0.0
    return float(numerator) / denominator


def get_all_n_grams_sentences(worker_id, domain, scenario, N=2):
    # get all the data created by this worker under the same domain and scenario
    all_data = mongo.db.trials.find({
        "worker_id": worker_id,
        "domain": domain,
        "scenario": scenario,
        "within_group_idx": {"$in": ['1', '2']},  # skip optional
        "need_validation": True
    }, {"assignment_id": 1, "group_id": 1, "within_group_idx": 1, "input": 1})

    # get all n-grams as {(assignment_id, group_id): {1: [], 2: []}}
    id_tuples = list(set([(data['assignment_id'], data['group_id']) for data in all_data]))
    # initialize
    input_ngrams = {id_tuple: {'1': [], '2': []} for id_tuple in id_tuples}
    input_sentences = {id_tuple: {'1': '', '2': ''} for id_tuple in id_tuples}
    # store n-grams into input_ngrams, raw sentences into input_sentences
    for data in all_data:
        curr_words = tokenize(data['input'])
        curr_n_grams = list(ngrams(curr_words, N))
        curr_id_tuple = (data['assignment_id'], data['group_id'])
        curr_idx = data['within_group_idx']
        input_ngrams[curr_id_tuple][curr_idx] = curr_n_grams
        input_sentences[curr_id_tuple][curr_idx] = data['input']

    return input_ngrams, input_sentences


def get_suspicious_intra_pairs(worker_id, domain, scenario, input_ngrams, input_sentences, scoring=jaccard_distance):
    """
        return paired input(s) that are either too irrelavant or the same
    """
    suspicious_intra_pairs = []
    for id_tuple, pair in input_ngrams.items():
        score = scoring(pair['1'], pair['2'])
        if score < INTRA_PAIR_MIN_SAFE_SIMILARITY_SCORE or score > INTRA_PAIR_MAX_SAFE_SIMILARITY_SCORE:
            suspicious_intra_pairs.append({
                'assignment_id': id_tuple[0],
                'group_id': id_tuple[1],
                'sent1': input_sentences[id_tuple]['1'],
                'sent2': input_sentences[id_tuple]['2'],
                "worker_id": worker_id,
                "domain": domain,
                "scenario": scenario,
                'score': score,
            })
    return suspicious_intra_pairs


def get_suspicious_inter_pairs(worker_id, domain, scenario, input_ngrams, input_sentences, scoring=jaccard_distance):
    suspicious_inter_pairs = []
    id_tuples = input_ngrams.keys()
    for i in range(len(id_tuples)):
        n_grams_i = input_ngrams[(id_tuples[i])]
        for j in range(i, len(id_tuples)):
            n_grams_j = input_ngrams[(id_tuples[j])]
            score_11 = scoring(n_grams_i['1'], n_grams_j['1'])
            score = score_11
            # score_12 = scoring(n_grams_i['1'], n_grams_j['2'])))    # skipped
            # score_21 = scoring(n_grams_i['2'], n_grams_j['1'])))    # skipped
            # score_22 = scoring(n_grams_i['2'], n_grams_j['2'])))    # skipped
            # score = (score_11 + score_12 + score_21 + score_22) / 4 # skipped
            if score > INTER_PAIR_MAX_SAFE_SIMILARITY_SCORE:
                suspicious_inter_pairs.append({
                    "input_group_1": {
                        'assignment_id': id_tuples[i][0],
                        'group_id': id_tuples[i][1],
                        'sent1': input_sentences[id_tuples[i]]['1'],
                        'sent2': input_sentences[id_tuples[i]]['2'],
                    },
                    "input_group_2": {
                        'assignment_id': id_tuples[j][0],
                        'group_id': id_tuples[j][1],
                        'sent1': input_sentences[id_tuples[j]]['1'],
                        'sent2': input_sentences[id_tuples[j]]['2'],
                    },
                    "worker_id": worker_id,
                    "domain": domain,
                    "scenario": scenario,
                    'score': score,
                })
    return suspicious_inter_pairs


# load trained models
def load_models(system):
    system['device'] = torch.device("cuda" if torch.cuda.is_available() and not False else "cpu")
    logging.basicConfig(
        format='%(asctime)s - %(levelname)s - %(name)s -   %(message)s',
        datefmt='%m/%d/%Y %H:%M:%S',
        level=logging.INFO if -1 in [-1, 0] else logging.WARN
    )

    system['tokenizer'] = AutoTokenizer.from_pretrained(system['model_name'])
    system['model'] = Transformer(system['model_name'], system['num_cls'])
    system['model'].to(system['device'])

    # Checkpoint
    checkpoint = torch.load(system['model_path'], map_location=system['device'])
    system['model'].load_state_dict(checkpoint['model_state_dict'])
    system['model'].eval()


@torch.no_grad()
def get_system_output(system, all_statements):
    tokenizer = system['tokenizer']
    device = system['device']
    model = system['model']
    max_length = 128  # adjust restrictions

    results = {
        "s1": {
            "1": {},  # {'vote': 1, 'prob': 0.74} [vote is the pred_result]
            "2": {},
        },
        "s2": {
            "1": {},
            "2": {},
        },
        "s3": {
            "1": {},
            "2": {},
        },
    }

    for statement in all_statements:
        for idx, text in statement.items():  # maybe add pre-processing later
            # Tokenized format: [CLS] [text] [PAD]
            # [CLS] token
            cls = tokenizer.cls_token
            text = f'{cls} {text}'
            inputs = tokenizer(text=text,
                               padding='max_length',
                               max_length=max_length,
                               add_special_tokens=False,
                               return_attention_mask=True)

            if 'num_truncated_tokens' in inputs and inputs['num_truncated_tokens'] > 0:
                logger.info('Attention! you are cropping tokens (swag task is ok).')

            input_ids = torch.tensor(inputs['input_ids'])
            attn_mask = torch.tensor(inputs['attention_mask'])

            assert len(input_ids) == max_length
            assert len(attn_mask) == max_length

            tokens = input_ids.unsqueeze(dim=0).to(device)
            mask = attn_mask.unsqueeze(dim=0).to(device)

            # Forward pass
            logit = model(tokens, mask)
            _, pred_cls = logit.max(dim=-1)
            scores = logit.cpu().numpy()
            pred = pred_cls.item()
            score = max(softmax(scores)[0])

            keys = idx.split('_')
            results[keys[0]][keys[1]] = {"vote": pred, "prob": round(score, 2)}

    return results


def slack_notify(text="see blocks", blocks=None):
    try:
        response = slack_client.chat_postMessage(
            channel='#cs-data-monitor',
            text=text,
            blocks=blocks)
        assert response["message"]["text"] == text
    except SlackApiError as e:
        # You will get a SlackApiError if "ok" is False
        assert e.response["ok"] is False
        assert e.response["error"]  # str like 'invalid_auth', 'channel_not_found'
        print(f"Got an error sending slack message {text}: {e.response}")


def warn_suspicious_intra_similarity(suspicious_intra_pairs):
    for data in suspicious_intra_pairs:
        message_in_block = "*WARNING: sentence pair not alike or too alike*\nassignment_id: *{}*\ngroup_id: *{}*\nscenario: *{}*\ndomain: *{}*\nworker: *{}*\nsent1: *{}*\nsent2: *{}*\nsimilarity score: *{}*".format(
            data["assignment_id"], data["group_id"], data["scenario"], data["domain"], data["worker_id"], data["sent1"],
            data["sent2"], data["score"])
        action_elements = [
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Flag it"
                },
                "value": "intra_flag"
            },
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "False alarm"
                },
                "value": "intra_ok"
            }
        ]
        blocks = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": message_in_block,
                }
            },
            {
                "type": "actions",
                "elements": action_elements,
            }
        ]
        slack_notify(blocks=blocks)


def warn_suspicious_inter_similarity(suspicious_intra_pairs):
    for data in suspicious_intra_pairs:
        message_in_block_1 = "*WARNING: input too similar*\nscenario: *{}*\ndomain: *{}*\nworker: *{}*\nSimilarity score: *{}*\n".format(
            data["scenario"], data["domain"], data["worker_id"], data["score"])

        message_in_block_2 = "*First group input*\nassignment_id: *{}*\ngroup_id: *{}*\nsent1: *{}*\nsent2: *{}*".format(
            data["input_group_1"]["assignment_id"], data["input_group_1"]["group_id"], data["input_group_1"]["sent1"],
            data["input_group_1"]["sent2"])

        message_in_block_3 = "*Second group input*\nassignment_id: *{}*\ngroup_id: *{}*\nsent1: *{}*\nsent2: *{}*".format(
            data["input_group_2"]["assignment_id"], data["input_group_2"]["group_id"], data["input_group_2"]["sent1"],
            data["input_group_2"]["sent2"])

        action_elements = [
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Flag it"
                },
                "value": "inter_flag"
            },
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "False alarm"
                },
                "value": "inter_ok"
            }
        ]
        blocks = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": message_in_block_1,
                }
            }, {
                "type": "divider"
            }, {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": message_in_block_2,
                }
            }, {
                "type": "divider"
            }, {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": message_in_block_3,
                }
            }, {
                "type": "actions",
                "elements": action_elements,
            }
        ]
        slack_notify(blocks=blocks)


def similarity_check(worker_id, domain, scenario, N=2):
    """
        n-gram + jaccard/cosine distance check to detect possible duplication
        will flag and notify the team in slack
    """

    # get n_grams as:
    # {(assignment_id, group_id): ['1': ngram_list_1, '2': ngram_list_2]}
    input_ngrams, input_sentences = get_all_n_grams_sentences(worker_id, domain, scenario, N)

    # check intra-pair similarity (should be similar but not the same)
    suspicious_intra_pairs = get_suspicious_intra_pairs(worker_id, domain, scenario, input_ngrams, input_sentences)
    print("suspicious_intra_pairs:", suspicious_intra_pairs)
    warn_suspicious_intra_similarity(suspicious_intra_pairs)

    # check inter-pair similarity (should not be similar)
    suspicious_inter_pairs = get_suspicious_inter_pairs(worker_id, domain, scenario, input_ngrams, input_sentences)
    print("suspicious_inter_pairs:", suspicious_inter_pairs)
    warn_suspicious_inter_similarity(suspicious_inter_pairs)


@app.route('/slack_response', methods=['POST'])
def slack_interactive_process():  # TODO
    """
        handle interactive slack rejection to update document:
            if repeated: add repeated id (make sure to count repetitions right)
            if too_short: add flag
    """
    pass


@app.route('/classify', methods=['POST'])
def classify():
    worker_id = session.get('worker_id')
    scenario = session.get('scenario')
    domain = session.get('domain')
    hit_id = session.get('hit_id')
    assignment_id = session.get('assignment_id')

    # LOCAL TEST ONLY - Start
    if LOCAL:
        worker_id = DUMMY_INFO['worker_id']
        scenario = DUMMY_INFO['scenario']
        domain = DUMMY_INFO['domain']
        hit_id = DUMMY_INFO['hit_id']
        assignment_id = DUMMY_INFO['assignment_id']
    # LOCAL TEST ONLY - End

    inputs = []  # [{s1_1: "statement 1"}, {s1_2: "statement 2"}...]

    # initialize response data format
    data = {
        "s1": {
            "1": {"input": '', "output": None, "score": None, "label": None, "input_change_not_tested": False},
            "2": {"input": '', "output": None, "score": None, "label": None, "input_change_not_tested": False},
            "3": {"input": '', "output": None, "score": None, "label": None, "input_change_not_tested": False},
        },
        "s2": {
            "1": {"input": '', "output": None, "score": None, "label": None, "input_change_not_tested": False},
            "2": {"input": '', "output": None, "score": None, "label": None, "input_change_not_tested": False},
            "3": {"input": '', "output": None, "score": None, "label": None, "input_change_not_tested": False},
        },
        "s3": {
            "1": {"input": '', "output": None, "score": None, "label": None, "input_change_not_tested": False},
            "2": {"input": '', "output": None, "score": None, "label": None, "input_change_not_tested": False},
            "3": {"input": '', "output": None, "score": None, "label": None, "input_change_not_tested": False},
        }
    }

    for key, all_inputs in request.json.items():
        for index, value in all_inputs.items():
            label = value["label"]
            text = value['input']
            score = value['score']
            output = value['output']

            # Skip empty inputs
            if not text and index != '3':
                continue

            if index != '3' and value['input_change_not_tested']:
                inputs.append({"_".join([key, index]): text})

            data[key][index]["input"] = text
            data[key][index]["label"] = label
            data[key][index]["output"] = output
            data[key][index]["score"] = score

    for system_id, system in SYSTEMS.items():
        # model_name = system.get('model_name')
        system_output = get_system_output(system, inputs)  # get predictions

        for key, all_outputs in system_output.items():
            for idx, value in all_outputs.items():

                # Skip empty input/output
                if not value:
                    continue

                data[key][idx]["output"] = (system_output[key][idx]["vote"] == 1)
                data[key][idx]["score"] = str(system_output[key][idx]["prob"])

                # Get a new timestamp depends on server setting
                ts = datetime.now()
                # Convert to US/Pacific time zone
                ts = ts.astimezone(timezone('US/Pacific')).isoformat()

                # store trial data in the mongo db
                new_entry = mongo.db.trials.insert_one({
                    'input': data[key][idx]['input'],
                    'output': data[key][idx]['output'],
                    'label': data[key][idx]['label'],
                    'score': data[key][idx]["score"],
                    'group_id': key,
                    'within_group_idx': idx,
                    'optional': data[key]['3']['input'],
                    'time_stamp': ts,
                    'hit_id': hit_id,
                    'assignment_id': assignment_id,
                    'code': '',
                    'scenario': scenario,
                    'domain': domain,
                    'worker_id': worker_id,
                    'need_validate': False,
                    'num_val': 0
                })
                # data[key][idx]["id"] = str(new_entry.inserted_id)

    return jsonify(data)


def input_length_check(data):
    words = tokenize(data['input'])
    mongo.db.trials.update_one(
        {"_id": data["_id"]},
        {'$set': {
            'length': len(words),
        }}
    )
    if len(words) < MIN_SENTENCE_LENGTH:
        warn_suspicious_input_length(data)


def warn_suspicious_input_length(data):
    message_in_block = "Warning: input sentence too short\nassignment_id: *{}*\ngroup_id: *{}*\nscenario: *{}*\ndomain: *{}*\nworker: *{}*\nlabel: *{}*\nprediction: *{}*\ninput: *{}*".format(
        data["assignment_id"], data["group_id"], data["scenario"], data["domain"], data["worker_id"], data["label"],
        data["output"], data["input"])
    action_elements = [
        {
            "type": "button",
            "text": {
                "type": "plain_text",
                "text": "Flag it"
            },
            "value": "length_flag"
        },
        {
            "type": "button",
            "text": {
                "type": "plain_text",
                "text": "False warning"
            },
            "value": "length_ok"
        }
    ]
    blocks = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": message_in_block,
            }
        },
        {
            "type": "actions",
            "elements": action_elements,
        }
    ]
    slack_notify(blocks=blocks)


@app.route('/submit', methods=['POST'])
def submit():
    global BONUS_PER_SENTENCE
    worker_id = session.get('worker_id')
    assignment_id = session.get('assignment_id')
    mode = session.get('mode')
    if session.get('bonus'):
        BONUS_PER_SENTENCE = float(session.get('bonus').split('$')[-1])
        assert (BONUS_PER_SENTENCE >= 0)
        assert (BONUS_PER_SENTENCE <= 2)
    max_possible_pay = 0
    max_possible_pay_str = ""
    num_sentence_fooled = 0

    # LOCAL TEST ONLY - Start
    if LOCAL:
        worker_id = DUMMY_INFO['worker_id']
        assignment_id = DUMMY_INFO['assignment_id']
        mode = DUMMY_INFO['mode']
        BONUS_PER_SENTENCE = float(DUMMY_INFO['bonus'].split('$')[-1])
    # LOCAL TEST ONLY - End

    code = str(uuid.uuid4())

    if mode == 'creation':
        # similarity_check(worker_id, domain, scenario, N) # TODO: test this
        for key in ['s1', 's2', 's3']:
            for idx in ['1', '2', '3']:
                data = mongo.db.trials.find_one({
                    'worker_id': worker_id,
                    'assignment_id': assignment_id,
                    'group_id': key,
                    'within_group_idx': idx
                }, sort=[('time_stamp', DESCENDING)])

                if idx in ['1', '2']:
                    if not data:
                        return jsonify({'status': 'not ok, no data fetched'})
                        # user shouldn't be able to submit without giving inputs 1 or 2
                        # if returned: buggy
                    else:
                        inputs = request.json.get('creationInputs')
                        mongo.db.trials.update_one(
                            {"_id": data["_id"]},  # data["_id"] is ObjectID("xxx")
                            {'$set': {
                                'input': inputs[key][idx]['input'],
                                'label': inputs[key][idx]['label'],
                                'need_validate': True,
                                'code': code
                            }}
                        )
                        if inputs[key][idx]['label'] != data['output']:
                            num_sentence_fooled += 1
                        # input_length_check(data)
        max_possible_pay = BONUS_PER_SENTENCE * num_sentence_fooled \
                           + BASE_PER_SENTENCE_CREATED * REQUIRED_NUM_SENTENCES_TO_CREATE
        max_possible_pay_str = '{:.2f}'.format(max_possible_pay)

    elif mode == 'validation':
        mongo.db.validations.update_many(
            {
                "assignment_id": assignment_id,
                "worker_id": worker_id
            },
            {'$set': {
                'code': code
            }}
        )
        max_possible_pay = REQUIRED_NUM_SENTENCES_TO_VALIDATE * BASE_PER_SENTENCE_TO_VALIDATE
        max_possible_pay_str = '{:.2f}'.format(max_possible_pay)
    else:
        print("ERROR: check mode!")
        return jsonify({'status': 'not ok, check mode!'})

    return jsonify({'code': code, 'max_pay': max_possible_pay_str})


@app.route('/survey', methods=['POST'])
def survey():
    # Get a new timestamp and session id
    ts = datetime.now().astimezone(timezone('US/Pacific')).isoformat()
    worker_id = session.get('worker_id')
    hit_id = session.get('hit_id')
    assignment_id = session.get('assignment_id')
    uid = session.get('uid')
    domain = session.get('domain')
    scenario = session.get('scenario')

    if LOCAL:
        worker_id = DUMMY_INFO['worker_id']
        scenario = DUMMY_INFO['scenario']
        domain = DUMMY_INFO['domain']
        hit_id = DUMMY_INFO['hit_id']
        assignment_id = DUMMY_INFO['assignment_id']
        uid = DUMMY_INFO['uid']

    # Get survey values from the request body
    comments = request.json.get('comments', None)
    helpful_instruction = request.json.get('helpful_instruction', None)
    challenging_creation = request.json.get('challenging_creation', None)

    # store data in the mongo db
    mongo.db.survey.update_one(
        {'assignment_id': assignment_id},
        {'$set': {
            'hit_id': hit_id,
            'worker_id': worker_id,
            'assignment_id': assignment_id,
            'hit_id': hit_id,
            'code': uid,
            'time_stamp': ts,
            'domain': domain,
            'scenario': scenario,
            'helpful_instruction': helpful_instruction,
            'challenging_creation': challenging_creation,
            'comments': comments,
        }}, upsert=True
    )

    return jsonify({
        'comments': comments,
        'helpful_instruction': helpful_instruction,
        'challenging_creation': challenging_creation,
    })


@app.route('/get_eval', methods=['GET'])
def get_eval():
    worker_id = session.get('worker_id')
    hit_id = session.get('hit_id')
    assignment_id = session.get('assignment_id')
    domain = session.get('domain')
    scenario = session.get('scenario')

    # LOCAL TEST ONLY - Start
    if LOCAL:
        worker_id = DUMMY_INFO['worker_id']
        hit_id = DUMMY_INFO['hit_id']
        assignment_id = DUMMY_INFO['assignment_id']
        domain = DUMMY_INFO['domain']
        scenario = DUMMY_INFO['scenario']
    # LOCAL TEST ONLY - End

    fetch_new = False
    # if validation status is False & still need validation, i.e. finish the unfinished pairs first
    unfinished_trial_ids = list(map(lambda x: x['trial'],
                                    mongo.db.validations.find({
                                        'worker_id': worker_id,
                                        'status': False,
                                    }, {'_id': 0, 'trial': 1})
                                    ))

    data = mongo.db.trials.find_one({
        "$and": [
            {'_id': {
                "$in": unfinished_trial_ids,
            }},
            {'domain': domain},
            {'scenario': scenario},
            {'num_val': {
                "$lt": MAX_VAL_VALUE,  # <
            }}]
    }, sort=[('num_val', ASCENDING), ('time_stamp', ASCENDING)])

    if not data:
        fetch_new = True
        # get a list of previously validated trials by this user
        validated_trial_ids = list(map(lambda x: x['trial'],
                                       mongo.db.validations.find({
                                           'worker_id': worker_id,
                                           'status': True,
                                       }, {'_id': 0, 'trial': 1})
                                       ))

        data = mongo.db.trials.find_one({
            "$and": [
                {'_id': {
                    "$nin": validated_trial_ids,
                }},
                {'need_validate': True},
                {'domain': domain},
                {'scenario': scenario},
                {'num_val': {
                    "$lt": MAX_VAL_VALUE,  # <
                }},
                {"$and": [{
                    'worker_id': {
                        "$ne": "pluslab_testers",
                    },
                }, {
                    'worker_id': {
                        "$ne": worker_id,
                    }
                }]}
            ]
        }, sort=[('time_stamp', ASCENDING), ('num_val', ASCENDING)])

    if not data:
        return jsonify({
            'status': 'ok',
            'id': '',
            "one_input_pair": {
                1: {"input": "", "output": None, "label": None, "score": ""},
                2: {"input": "", "output": None, "label": None, "score": ""},
            }})

    another_idx = '1' if data['within_group_idx'] == '2' else '2'
    another_data = mongo.db.trials.find_one(
        {'need_validate': True,
         'code': data['code'],
         'group_id': data['group_id'],
         'within_group_idx': another_idx},
        {"_id": 1, "input": 1, "output": 1, "label": 1, "score": 1}
    )

    if fetch_new:
        ts = datetime.now().astimezone(timezone('US/Pacific')).isoformat()
        # put the fetched data pair in validation collection
        mongo.db.validations.insert_one({
            'trial': data['_id'],
            'hit_id': hit_id,  # validation HIT info
            'worker_id': worker_id,  # validation HIT info
            'assignment_id': assignment_id,  # validation HIT info
            'domain': domain,
            'scenario': scenario,
            'status': False,
            'time_stamp': ts
        })
        mongo.db.validations.insert_one({
            'trial': another_data['_id'],
            'hit_id': hit_id,  # validation HIT info
            'worker_id': worker_id,  # validation HIT info
            'assignment_id': assignment_id,  # validation HIT info
            'domain': domain,
            'scenario': scenario,
            'status': False,
            'time_stamp': ts
        })

    return jsonify({
        'status': 'ok',
        'id': '_'.join([str(data['_id']), str(another_data['_id'])]),
        'worker_id': data['worker_id'],
        'time_stamp': data['time_stamp'],
        "one_input_pair": {
            1: {"input": another_data['input'], "output": another_data['output'], "label": another_data['label'],
                "score": another_data['score']},
            2: {"input": data['input'], "output": data['output'], "label": data['label'], "score": data['score']},
        }})


@app.route('/set_eval', methods=['POST'])
def set_eval():
    ques_ans = {}
    ques_keys = ['keep_edit_bonus',
                 'bonus_reduction_reasons',
                 'how_much_like',
                 'label_check',
                 'domain_check',
                 'scenario_check',
                 'numeracy_check',
                 'edit_suggestion']
    for question in ques_keys:
        ques_ans[question] = request.json.get(question)

    data_id_arr = request.json.get('dataID').split('_')
    ts = datetime.now().astimezone(timezone('US/Pacific')).isoformat()
    worker_id = session.get('worker_id')

    # LOCAL TEST ONLY - Start
    if LOCAL:
        worker_id = DUMMY_INFO['worker_id']
    # LOCAL TEST ONLY - End

    if data_id_arr:
        mongo.db.trials.update_one(
            {"_id": ObjectId(data_id_arr[0])},
            {'$inc': {'num_val': 1}}
        )
        mongo.db.trials.update_one(
            {"_id": ObjectId(data_id_arr[1])},
            {'$inc': {'num_val': 1}}
        )

        mongo.db.validations.update_one(
            {
                "trial": ObjectId(data_id_arr[0]),
                "worker_id": worker_id
            },
            {'$set': {
                **ques_ans,
                'time_stamp': ts,
                'status': True
            }}
        )
        mongo.db.validations.update_one(
            {
                "trial": ObjectId(data_id_arr[1]),
                "worker_id": worker_id
            },
            {'$set': {
                **ques_ans,
                'time_stamp': ts,
                'status': True
            }}
        )
        return jsonify({'status': 'ok'})

    return jsonify({'status': 'not ok'})


@app.route('/')
def index():
    uid = uuid.uuid4()
    session['uid'] = str(uid)  # this is the code
    session['hit_id'] = request.args.get('hit_id')
    session['worker_id'] = request.args.get('worker_id')
    session['assignment_id'] = request.args.get('assignment_id')
    session['scenario'] = request.args.get('scenario')
    session['domain'] = request.args.get('domain')
    session['mode'] = request.args.get('mode')
    session['bonus'] = request.args.get('bonus')
    return app.send_static_file('index.html')


if __name__ == "__main__":
    for system in SYSTEMS.values():
        load_models(system)

    host = os.environ.get('MCS_SERVER_HOST', '0.0.0.0')
    port = int(os.environ.get('MCS_SERVER_PORT', '5005'))

    app.run(host=host, port=port, debug=False)
