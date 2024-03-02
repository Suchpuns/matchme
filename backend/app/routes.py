import json
from app import app
from app.graph_calc import generate_assignments

@app.route("/")
def hello_match_me():
    return {"msg": "Hello world" }

@app.route("/test")
def test():
    roles = [("Wand", 2), ("Potion", 1), ("Crystal Ball", 1)]
    preferences = [{
        "name": "Dorian",
        "preference": [1, 2, 3]
    },
    {
        "name": "Dani",
        "preference": [3, 2, 1]
    },
    {
        "name": "Monica",
        "preference": [2, 1, 3]
    },
    {
        "name": "Nico",
        "preference": [3, 2, 1]
    }
    ]
    res = generate_assignments(roles,preferences)
    return json.dumps(res)