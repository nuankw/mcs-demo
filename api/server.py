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
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://0.0.0.0:27017/mcs')
app.config["MONGO_URI"] = MONGO_URI
mongo = PyMongo(app)

# Initialize the flask session
SESSION_TYPE = 'mongodb'
SESSION_MONGODB = mongo.cx
SESSION_MONGODB_DB = 'mcs'
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
    max_length = 48  # TODO (original 48, is there any restriction?)

    results = {}
    for idx, statement in enumerate(all_statements):
        text = statement  # TODO ( strip() or other processing )

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

        result_key = 's' + str(idx + 1)
        results[result_key] = {"vote": pred, "prob": round(score, 2)}

    # output format: {'s1': {'vote': 1, 'prob': 0.87}, 's2': {'vote': 1, 'prob': 0.87} ...}
    return results


@app.route('/classify', methods=['POST'])
def classify():
    # no single pair test function
    # TODO front-end: max s1-s6 ; back-end will do empty check
    max_statements = 6
    inputs = []
    data = {}

    for key, all_inputs in request.json.items():

        for index, value in all_inputs.items():

            label = request.json.get(key + '_' + index + '_label')
            text = value['input']

            # Don't bother with empty inputs
            if not text and index != '3':
                return jsonify({'status': 'not ok'})

            inputs.append(text)
            data[key] = {
                "input": text,
                "output": None,
                "scores": {},
                "label": label,
            }

    # check for the false statement
    num_fool_model = 0
    for system_id, system in SYSTEMS.items():
        model_name = system.get('model_name')
        system_output = get_system_output(system, inputs)   # get predictions
        for key, value in system_output.items():
            data[key]["scores"][model_name] = {**value}
            data[key]["output"] = (system_output[key]["pred_label"] == 1)
            if data[key]["label"] != data[key]["output"]:   # TODO type match
                num_fool_model += 1

    bonus_rate = 1
    bonus_payment = round(bonus_rate * num_fool_model, 2)
    data['bonus_payment'] = bonus_payment

    # Return json output
    # output format: { bonus_payment: ...,
    #                  's1': {
    #                           'input': "statement ...",
    #                           'output': True,
    #                           'scores': {'vote': 1, 'prob': 0.87}
    #                       },
    #                  's2': ....
    # not contain data for empty 's_x'
    # TODO: is it enough? no data['id'] here
    return jsonify(data)


@app.route('/submit', methods=['POST'])
def submit():
    # no matter whether user click test_all/test, after clicking the submit, is valid => store in DB & go next page
    # TODO front-end: ensure s1 - s6 are all not empty * or use the return value
    # TODO back-end: maybe global variable for max_statements
    max_statements = 6
    inputs = []
    data = {}
    for i in range(max_statements):
        para = 's' + str(i+1)
        inputs.append(request.json.get(para))
        label = request.json.get(para + '_label')  # TODO check para name & value
        option = request.json.get(para + '_option')
        data[para] = {
            "input": inputs[i],
            "output": False,
            "scores": {},
            "label": label,
            "optional knowledge": option
        }

    # check for the false statement
    for system_id, system in SYSTEMS.items():
        model_name = system.get('model_name')
        system_output = get_system_output(system, inputs)
        for key, value in system_output.items():
            data[key]["scores"][model_name] = {**value}
            data[key]["output"] = (system_output[key]["pred_label"] == 1)

    # Get a new timestamp and session id
    ts = datetime.now().isoformat()
    uid = session.get('uid')

    # TODO update DB
    # store trial data in the mongo db
    for idx, item in enumerate(data):
        pair_id = idx // 2 + 1
        mongo.db.trials.insert_one({
            's1': data[item],
            'pair_id': pair_id,
            'ts': ts,
            'session': uid,
            'hit_id': session.get('hit_id', ''),
            'worker_id': session.get('worker_id', ''),
            'scenario': session.get('scenario', ''),
            'validator': 0,     # TODO whether there is a better way to handle?
                                # TODO [record fetch times, but fetch != will finish]
                                # TODO the last validator hasn't finished, but another validator comes
            'validation': [],
            'need_validate': True
        })

    # Return json output
    # TODO: whether it is a valid submission (if there is empty string or duplication, return 'not ok') or use code
    code = str(uuid.uuid4())
    return jsonify({'code': code})


@app.route('/survey', methods=['POST'])
def survey():
    # Get a new timestamp and session id
    ts = datetime.now().isoformat()
    worker_id = session.get('worker_id')
    hit_id = session.get('hit_id')
    uid = session.get('uid')

    # Get survey values from the request body
    enjoyment = request.json.get('enjoyment', None)  # TODO update para name
    returning = request.json.get('returning', None)

    # store trial data in the mongo db
    updated = mongo.db.survey.update_one(
        {'hit_id': hit_id, 'worker_id': worker_id},
        {'$set': {
            'ts': ts,
            'session': uid,
            'hit_id': hit_id,
            'worker_id': worker_id,
            'enjoyment': enjoyment,
            'returning': returning,
        }}, upsert=True
    )
    return jsonify({'enjoyment': enjoyment, 'returning': returning})


@app.route('/get_eval', methods=['GET'])
def get_eval():
    uid = session.get('uid')
    hit_id = session.get('hit_id')
    worker_id = session.get('worker_id')

    data = mongo.db.trials.find_one({
        "$and": [
            {'need_validate': True},
            {'session': {
                "$ne": uid,
            }},
            {"$or": [{
                'hit_id': None,
            }, {
                'hit_id': {
                    "$ne": hit_id,  # figure it out
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
    }, sort=[('validator', ASCENDING), ('ts', DESCENDING)])
    if data:
        return jsonify({
            'status': 'ok',
            'id': str(data['_id']),
            'input': data['s1']['input'],
            'output': data['s1']['output'],
            #'optional': data['s1']['optional'],
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
    updated.update({'workerID': worker_id, 'dataID': data_id})
    print(updated)

    # TODO
    """ please comment this line to update the following commented-out code
    mongo.db.trials.update_one(
        {"_id": ObjectId(data_id)},
        {'$push': {'validation': {**updated}},
         '$inc': {'validator': 1}}
    )

    curr_val_num = mongo.db.trials.find_one({"_id": ObjectId(data_id)})['validator']
    # 3 is the max validation we want
    if curr_val_num == 3:
        mongo.db.trials.update_one(
            {"_id": ObjectId(data_id)},
            {'$set': {'need_validate': False}}
        )
    # """

    return jsonify({'status': 'ok'})


@app.route('/')
def index():
    ts = datetime.now().isoformat()
    uid = uuid.uuid4()
    session['ts'] = ts
    session['uid'] = uid
    session['hit_id'] = request.args.get('hit_id')
    session['worker_id'] = request.args.get('worker_id')
    session['scenario'] = request.args.get('scenario')
    return app.send_static_file('index.html')


if __name__ == "__main__":
    for system in SYSTEMS.values():
        load_models(system)

    host = os.environ.get('MCS_SERVER_HOST', '0.0.0.0')
    port = int(os.environ.get('MCS_SERVER_PORT', '5005'))

    app.run(host=host, port=port, debug=True)
