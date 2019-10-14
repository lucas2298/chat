import csv, json

csvFilePath = 'test.csv'
jsonFilePath = 'test.json'

data = {}

with open(csvFilePath, "r", encoding='utf-8-sig') as csvFile:
    csvReader = csv.DictReader(csvFile)
    data['intents'] = []
    # for rows in csvReader:
    #     oldstr = rows['selectList']
    #     oldstr = oldstr.replace("'", "")
    #     newstr = oldstr[1:len(oldstr)-1]
    #     print(newstr.split(','))

    for rows in csvReader:
        print(rows['tag'])
        s = ""
        for i in rows:
            # data['intents'].append({
            #     i: rows[i],
            # })
            s += i + ': ' + rows[i] + ',' + '\n'
        print(s,'\n')

    with open(jsonFilePath, 'w', encoding='utf-8-sig') as json_data:
        json.dump(data, json_data)