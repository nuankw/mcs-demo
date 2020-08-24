from flask import (
    Flask,
    jsonify,
    request,
)
import uuid
from flask import session
from flask_pymongo import PyMongo
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
# app.config['SECRET_KEY'] = 'asdf'

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
        'model_path': '../model_ckpt/ep_13_16k_acc_87.2984_roberta_large.pth',
        'num_cls': 2,
        'tokenizer': None,
        'device': None,
        'model': None,
    },
}

VALIDATION_TIMES = 5


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
    max_length = 48  # TODO (original 48, is it something caused by UI design)

    results = {}
    for idx, statement in enumerate(all_statements):
        text = statement  # TODO maybe doing strip() or other processing work

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
        results[result_key] = {"pred_label": pred, "prob": round(score, 2)}

    # output format: {'s1': {'pred_label': 1, 'prob': 0.87}, 's2': {'pred_label': 1, 'prob': 0.87} ...}
    return results


# -----------------------------------------------------------------------
# Creation Part 1 (Test)
# -----------------------------------------------------------------------
@app.route('/classify', methods=['POST'])
def classify():
    # TODO front-end: max s1-s6
    max_statements = 6
    inputs = []
    data = {}
    for i in range(max_statements):
        para = 's' + str(i+1)
        sent = request.json.get(para)
        if sent != '':
            inputs.append(sent)
            data[para] = {
                "input": inputs[i],
                "output": False,
                "scores": {},
            }

    # check for the false statement
    for system_id, system in SYSTEMS.items():
        model_name = system.get('model_name')
        system_output = get_system_output(system, inputs)   # get predictions
        for key, value in system_output.items():
            data[key]["scores"][model_name] = {**value}
            data[key]["output"] = (system_output[key]["pred_label"] == 1)

    # Return json output
    # output format: {'s1': {
    #                           'input': "statement ...",
    #                           'output': True,
    #                           'scores': {'pred_label': 1, 'prob': 0.87}
    #                       },
    #                  's2': ....
    return jsonify(data)


# -----------------------------------------------------------------------
# Creation Part 2 (submit & save)
# -----------------------------------------------------------------------
@app.route('/submit', methods=['POST'])
def submit():
    # TODO front-end: ensure s1 - s6 are all not empty * or use the return value
    max_statements = 6
    inputs = []
    data = {}
    for i in range(max_statements):
        para = 's' + str(i+1)
        inputs.append(request.json.get(para))
        data[para] = {
            "input": inputs[i],
            "output": False,
            "scores": {},
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
    # new_entry = mongo.db.trials.insert_one({
    #     **data,
    #     'ts': ts,
    #     'session': uid,
    #     'hit_id': session.get('hit_id', ''),
    #     'worker_id': session.get('worker_id', ''),
    #     'scenario': session.get('scenario', ''),
    # })
    # data['id'] = str(new_entry.inserted_id)

    # Return json output
    # TODO: i am thinking about this part, if there is empty string or duplication, return 'not ok' or return 'ok'
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
        # get_system_output(system, ["test"])

    # host = os.environ.get('MCS_SERVER_HOST', 'localhost')
    # port = int(os.environ.get('MCS_SERVER_PORT', '15005'))

    # app.run(host=host, port=port, debug=True)
