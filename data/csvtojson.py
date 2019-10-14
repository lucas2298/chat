import csv, json

csvFilePath = 'test.csv'

with open('test.csv', "r", encoding='utf-8-sig') as csvFile:
    csvReader = csv.DictReader(csvFile)
    for rows in csvReader:
        print(rows['tag'])

with open('test.csv', "r", encoding='utf-8-sig') as csvFile:
    csvReader = csv.DictReader(csvFile)
    for rows in csvReader:
        oldstr = rows['selectList']
        oldstr = oldstr.replace("'", "")
        newstr = oldstr[1:len(oldstr)-1]
        print(newstr.split(','))