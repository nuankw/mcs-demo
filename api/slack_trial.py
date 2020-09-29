import os
from slack import WebClient
from slack.errors import SlackApiError
# Bot User OAuth Access Token
# get it at https://api.slack.com/apps/A01AUV60P3R/oauth?success=1
slack_token=os.environ['SLACK_API_TOKEN']
slack_client = WebClient(slack_token)

def slack_notify(text = "see blocks", blocks = None):
    try:
        response = slack_client.chat_postMessage(
            channel = '#cs-data-monitor',
            text = text,
            blocks = blocks)
        assert response["message"]["text"] == text
    except SlackApiError as e:
        # You will get a SlackApiError if "ok" is False
        assert e.response["ok"] is False
        assert e.response["error"]  # str like 'invalid_auth', 'channel_not_found'
        print(f"Got an error sending slack message {text}: {e.response}")


def warn_suspicious_intra_similarity(suspicious_intra_pairs):
    for data in suspicious_intra_pairs:
        message_in_block = "*WARNING: sentence pair not alike or too alike*\nassignment_id: *{}*\ngroup_id: *{}*\nscenario: *{}*\ndomain: *{}*\nworker: *{}*\nsent1: *{}*\nsent2: *{}*\nsimilarity score: *{}*".format(
                data["assignment_id"], data["group_id"], data["scenario"], data["domain"], data["worker_id"], data["sent1"], data["sent2"], data["score"])
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
                data["input_group_1"]["assignment_id"], data["input_group_1"]["group_id"], data["input_group_1"]["sent1"], data["input_group_1"]["sent2"])

        message_in_block_3 = "*Second group input*\nassignment_id: *{}*\ngroup_id: *{}*\nsent1: *{}*\nsent2: *{}*".format(
                data["input_group_2"]["assignment_id"], data["input_group_2"]["group_id"], data["input_group_2"]["sent1"], data["input_group_2"]["sent2"])

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


def warn_suspicious_input_length(data):
    message_in_block = "Warning: input sentence too short\nassignment_id: *{}*\ngroup_id: *{}*\nscenario: *{}*\ndomain: *{}*\nworker: *{}*\nlabel: *{}*\nprediction: *{}*\ninput: *{}*".format(
            data["assignment_id"], data["group_id"], data["scenario"], data["domain"], data["worker_id"], data["label"], data["output"], data["input"])
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


def intra_test():
    suspicious_intra_pairs  = []

    suspicious_intra_pairs.append({
        'assignment_id': "adfhjiojaf",
        'group_id': "s1",
        'sent1': "s1 sentence aa aa aa aa aa aa aa 1",
        'sent2': "s1 sentence aa aa aa aa aa aa aa 2",
        "worker_id": "hfudkdfg",
        "domain": "social",
        "scenario": "numeracy",
        'score': "(bigram) 0.9+",
    })

    suspicious_intra_pairs.append({
        'assignment_id': "klghdutrd",
        'group_id': "s2",
        'sent1': "s2 sentence 1 asd",
        'sent2': "s2 sentence 2",
        "worker_id": "hfudkdfg",
        "domain": "social",
        "scenario": "numeracy",
        'score': "(bigram) 0.5-",
    })

    warn_suspicious_intra_similarity(suspicious_intra_pairs)


def inter_test():
    suspicious_inter_pairs = []

    suspicious_inter_pairs.append({
                    "input_group_1": {
                        'assignment_id': "input_group_1_assignment_id",
                        'group_id': "input_group_1_group_id",
                        'sent1': "input_group_1_sent1",
                        'sent2': "input_group_1_sent2",
                    },
                    "input_group_2": {
                        'assignment_id': "input_group_2_assignment_id",
                        'group_id': "input_group_2_group_id",
                        'sent1': "input_group_2_sent1",
                        'sent2': "input_group_2_sent2",
                    },
                    "worker_id": "worker_id",
                    "domain": "domain",
                    "scenario": "scenario",
                    'score': "score",
                })
    suspicious_inter_pairs.append({
                "input_group_1": {
                    'assignment_id': "2_input_group_1_assignment_id",
                    'group_id': "input_group_1_group_id",
                    'sent1': "input_group_1_sent1",
                    'sent2': "input_group_1_sent2",
                },
                "input_group_2": {
                    'assignment_id': "2_input_group_2_assignment_id",
                    'group_id': "input_group_2_group_id",
                    'sent1': "input_group_2_sent1",
                    'sent2': "input_group_2_sent2",
                },
                "worker_id": "another worker",
                "domain": "domain",
                "scenario": "scenario",
                'score': "score",
            })
    warn_suspicious_inter_similarity(suspicious_inter_pairs)


def length_test():
    data = {
        "assignment_id": "for length test",
        "group_id": "for length test",
        "scenario": "for length test",
        "domain": "for length test",
        "worker_id": "for length test",
        "label": "for length test",
        "output": "for length test",
        "input": "for length test"
    }
    warn_suspicious_input_length(data)

if __name__ == "__main__":

    intra_test()
    inter_test()
    length_test()