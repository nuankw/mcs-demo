import json
with open('comments.json', encoding='utf-8') as data_file:
   data = json.loads(data_file.read())
   for d in data:
       if "comments" in d.keys():
           print(d['comments'])