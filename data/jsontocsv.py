import json
with open('intents.json', encoding='utf-8') as json_data:
	intents = json.load(json_data)
# open csv for write
import csv
employ_data = open('test.csv', "w", encoding='utf-8-sig', newline='')

csvwriter = csv.writer(employ_data)

flag = False

for i in intents['intents']:
    if not flag:
        csvwriter.writerow(i.keys())
        flag = True
    csvwriter.writerow(i.values())
employ_data.close()