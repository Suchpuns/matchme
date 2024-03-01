from flask import Flask
# Possible security concern
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_match_me():
    return {"msg": "Hello world" }