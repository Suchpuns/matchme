from app import app

@app.route("/")
def hello_match_me():
    return {"msg": "Hello world" }
