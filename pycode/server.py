from flask import Flask, request
import json
from running import response

app = Flask(__name__)
@app.route('/')
def index():
    return "Flask server"

@app.route('/postdata', methods = ['POST'])
def postdata():
    data = request.get_json()
    return response(data)

if __name__ == "__main__":
    app.run(port=4001)