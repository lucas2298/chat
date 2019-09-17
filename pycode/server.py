from flask import Flask, request
import json

app = Flask(__name__)
@app.route('/')
def index():
    return "Flask server"

@app.route('/postdata', methods = ['POST'])
def postdata():
    data = request.data
    return data

if __name__ == "__main__":
    app.run(port=4001)