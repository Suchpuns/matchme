import json
from app import app
from app.graph_calc import generate_assignments

@app.route("/")
def hello_match_me():
    return {"msg": "Hello world" }

@app.route("/test")
def test():
    roles = [("FE", 7), ("BE",3)]
    preferences = [
        {
            "name": "Dylan",
            "preference": [1,2]
        },
        {
            "name": "George",
            "preference": [2,1]
        }
    ] * 5
    res = generate_assignments(roles,preferences)
    return json.dumps(res)