from app import app
from app import db
from app.models import Event
from sqlalchemy import update
from flask import request
from cryptography.fernet import Fernet
import json
from config import Config


if Config.FERMET_KEY:
    fernet = Fernet(Config.FERMET_KEY)


@app.route("/")
def hello_match_me():
    return {"msg": "Hello world"}


@app.route("/events/", methods=["GET"])
def get_events():
    events = Event.query.all()
    return {"events": events}


@app.route("/events/", methods=["POST"])
def post_event():
    data = request.get_json()
    if "event_name" not in data:
        return {"error": "missing event_name"}
    new_event = Event(name=data["event_name"], roles='{"roles": []}')
    db.session.add(new_event)
    db.session.commit()
    return {"msg": "success"}


@app.route("/events/", methods=["DELETE"])
def delete_event():
    data = request.get_json()
    if "event_name" not in data:
        return {"error": "missing event_name"}
    db.session.query(Event).filter(Event.name == data["event_name"]).delete()
    db.session.commit()
    return {"msg": "success"}


@app.route("/events/roles", methods=["GET"])
def get_roles():
    data = request.args.get("event_name")
    if not data:
        return {"error": "missing event_name"}
    print(data)
    # event = db.session.query(Event).filter(Event.name == data).all()
    data = json.loads(data)
    event = db.session.query(Event.roles).filter(Event.name == data).first()
    if event is None:
        return {"error": "no event found"}
    return {"roles": event[0]}


@app.route("/events/roles", methods=["POST", "PUT"])
def post_roles():
    data = request.get_json()
    if "event_name" not in data:
        return {"error": "missing event_name"}
    roles = (
        db.session.query(Event.roles).filter(Event.name == data["event_name"]).first()
    )
    if roles is None:
        return {"error": "no event found"}
    print(roles)
    new_roles = data["roles"]
    stmt = update(Event).where(Event.name == data["event_name"]).values(roles=new_roles)
    db.session.execute(stmt)
    db.session.commit()

    return {"msg": "success"}


@app.route("/events/form_links", methods=["POST"])
def get_form_links():
    data = request.get_json()
    if "event_name" not in data:
        return {"error": "missing event_name"}
    event_name = data["event_name"]
    if "people" not in data:
        return {"error": "missing people"}
    people = data["people"]

    if Config.FERMET_KEY == None or fernet == None:
        return {"error": "backend has no key set"}

    links = []
    for person in people:
        code_data = {"event_name": event_name, "person": person}
        code_data = json.dumps(code_data)
        links.append(
            f"http://{Config.BACKEND_URL}/form/{fernet.encrypt(code_data.encode()).decode()}"
        )
    return {"links": links}


@app.route("/form/<code>", methods=["POST"])
def post_form(code):
    if Config.FERMET_KEY == None or fernet == None:
        return {"error": "backend has no key set"}

    data_json = fernet.decrypt(code.encode()).decode()

    print(data_json)

    return {"msg": "success"}
