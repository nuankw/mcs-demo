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

from datetime import datetime
import logging
import os

logger = logging.getLogger(__name__)


app = Flask(__name__, static_url_path='')
CORS(app)
app.secret_key = os.environ.get('APP_SECRET', '')

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
        'model_path': 'models/ep_13_16k_acc_87.2984_roberta_large.pth',
        'num_cls': 2,
        'tokenizer': None,
        'device': None,
        'model': None,
    },
}

NUM_QUESTIONS = 5

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
    max_length = 48  # adjust restrictions

    results = {
        "s1": {
            "1": {},    # {'vote': 1, 'prob': 0.74} [vote is the pred_result]
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
            tokens = [tokenizer.cls_token]
            tokens += tokenizer.tokenize(text)

            inputs = tokenizer.encode_plus(text=tokens,
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


@app.route('/classify', methods=['POST'])
def classify():

    worker_id = session.get('worker_id')
    scenario = session.get('scenario')
    domain = session.get('domain')
    hit_id = session.get('hit_id')
    assignment_id = session.get('assignment_id')
    uid = session.get('uid')

    inputs = []     # [{s1_1: "statement 1"}, {s1_2: "statement 2"}...]

    # initialize response data format
    data = {
        "s1": {
            "1": {"input": '', "output": None, "label": None, "input_change_not_tested": False},
            "2": {"input": '', "output": None, "label": None, "input_change_not_tested": False},
            "3": {"input": '', "output": None, "label": None, "input_change_not_tested": False},
        },
        "s2": {
            "1": {"input": '', "output": None, "label": None, "input_change_not_tested": False},
            "2": {"input": '', "output": None, "label": None, "input_change_not_tested": False},
            "3": {"input": '', "output": None, "label": None, "input_change_not_tested": False},
        },
        "s3": {
            "1": {"input": '', "output": None, "label": None, "input_change_not_tested": False},
            "2": {"input": '', "output": None, "label": None, "input_change_not_tested": False},
            "3": {"input": '', "output": None, "label": None, "input_change_not_tested": False},
        }
    }

    for key, all_inputs in request.json.items():
        for index, value in all_inputs.items():
            label = value["label"]
            text = value['input']

            # Skip empty inputs
            if not text and index != '3':
                continue

            if index != '3':
                inputs.append({"_".join([key, index]): text})

            data[key][index]["input"] = text
            data[key][index]["label"] = label

    # check for the false statement
    num_fool_model = 0
    for system_id, system in SYSTEMS.items():
        # model_name = system.get('model_name')
        system_output = get_system_output(system, inputs)  # get predictions

        for key, all_outputs in system_output.items():
            for idx, value in all_outputs.items():

                # Skip empty input/output
                if not value:
                    continue

                # data[key][idx]["scores"][model_name] = {**value}
                data[key][idx]["output"] = (system_output[key][idx]["vote"] == 1)
                if data[key][idx]["label"] != data[key][idx]["output"]:
                    num_fool_model += 1

                # Get a new timestamp and session id
                ts = datetime.now().isoformat()

                # store trial data in the mongo db
                new_entry = mongo.db.trials.insert_one({
                    'input': data[key][idx]['input'],
                    'output': data[key][idx]['output'],
                    'label': data[key][idx]['label'],
                    'key': key,
                    'key_idx': idx,
                    'optional': data[key]['3']['input'],
                    'time_stamp': ts,
                    'code': uid,
                    'hit_id': hit_id,
                    'assignment_id': assignment_id,
                    'scenario': scenario,
                    'domain': domain,
                    'worker_id': worker_id,
                    'need_validate': False,
                })
                # data[key][idx]["id"] = str(new_entry.inserted_id)

    bonus_rate = 1
    bonus_payment = round(bonus_rate * num_fool_model, 2)

    return jsonify(data)


@app.route('/submit', methods=['POST'])
def submit():
    worker_id = session.get('worker_id')
    hit_id = session.get('hit_id')
    assignment_id = session.get('assignment_id')
    uid = session.get('uid')

    for key in ['s1', 's2', 's3']:
        for idx in ['1', '2', '3']:
            data = mongo.db.trials.find_one({
                'worker_id': worker_id,
                "assignment_id": assignment_id,
                'hit_id': hit_id,
                'key': key,
                'key_idx': idx,
            }, sort=[('time_stamp', DESCENDING)])

            if not data:
                if idx in ['1', '2']:
                    return jsonify({'status': 'not ok'})
            else:
                mongo.db.trials.update_one(
                    {"_id": data['_id']},
                    {'$set': {
                        'need_validate': True,
                        'validation': [],
                        'num_val': 0,
                    }}
                )

    # where to do duplicate detection
    return jsonify({'code': uid})


@app.route('/survey', methods=['POST'])
def survey():
    # Get a new timestamp and session id
    ts = datetime.now().isoformat()
    worker_id = session.get('worker_id')
    hit_id = session.get('hit_id')
    assignment_id = session.get('assignment_id')
    uid = session.get('uid')

    # Get survey values from the request body
    commonsense = request.json.get('commonsense', None)
    challenging = request.json.get('challenging', None)

    # store trial data in the mongo db
    updated = mongo.db.survey.update_one(   # new database collection
        {'hit_id': hit_id, 'worker_id': worker_id},
        {'$set': {
            'time_stamp': ts,
            'code': uid,
            'hit_id': hit_id,
            'worker_id': worker_id,
            'assignment_id': assignment_id,
            'commonsense': commonsense,
            'challenging': challenging,
        }}, upsert=True
    )
    return jsonify({'commonsense': commonsense, 'challenging': challenging})


@app.route('/get_eval', methods=['GET'])
def get_eval():
    uid = session.get('uid')
    hit_id = session.get('hit_id')
    worker_id = session.get('worker_id')

    max_val_num = 3

    data = mongo.db.trials.find_one({
        "$and": [
            {'num_val': {
                "$lt": max_val_num,    # <
            }},
            {'code': {
                "$ne": uid,
            }},
            {"$or": [{
                'hit_id': None,
            }, {
                'hit_id': {
                    "$ne": hit_id,
                },
            }]},
            {"$or": [{
                'worker_id': None,
            }, {
                'worker_id': {
                    "$ne": worker_id,
                }
            }]},
        ]
    }, sort=[('num_val', ASCENDING), ('time_stamp', DESCENDING)])
    if data:
        return jsonify({
            'status': 'ok',
            'id': str(data['_id']),
            'input': data['input'],
            'output': data['output'],
            'optional': data['optional'],
        })
    return jsonify({'status': 'not ok'})


@app.route('/set_eval', methods=['POST'])
def set_eval():
    ques_ans = {}
    for i in range(1, NUM_QUESTIONS + 1):
        question = 'evalQ' + str(i)
        ques_ans[question] = request.json.get(question)

    data_id = request.json.get('dataID')
    worker_id = session.get('worker_id')

    # TODO: worker_id == None when url is: http://localhost:3000/?hit_id=0&scenario=s3&worker_id=0%27
    print('worker_id:', worker_id, "-- it shouldn't be None!")

    updated = ques_ans
    updated.update({'workerID': worker_id})
    print(updated)

    mongo.db.trials.update_one(
        {"_id": ObjectId(data_id)},
        {'$push': {'validation': {**updated}},
         '$inc': {'num_val': 1}}
    )

    return jsonify({'status': 'ok'})


@app.route('/')
def index():
    uid = uuid.uuid4()
    session['uid'] = uid # this is the code
    session['hit_id'] = request.args.get('hit_id')
    session['worker_id'] = request.args.get('worker_id')
    session['assignment_id'] = request.args.get('assignment_id')
    session['scenario'] = request.args.get('scenario')
    session['domain'] = request.args.get('domain')
    return app.send_static_file('index.html')


if __name__ == "__main__":
    for system in SYSTEMS.values():
        load_models(system)

    host = os.environ.get('MCS_SERVER_HOST', '0.0.0.0')
    port = int(os.environ.get('MCS_SERVER_PORT', '5005'))

    app.run(host=host, port=port, debug=True)
