import json
from app import app
from app.graph_calc import generate_assignments
from app import db
from app.models import Event, Preferences
from sqlalchemy import update
from flask import request
from cryptography.fernet import Fernet
import json
from config import Config


if Config.FERMET_KEY:
    fernet = Fernet(Config.FERMET_KEY)


groups = {}


@app.route("/groups", methods=["POST"])
def post_groups():
    data = request.get_json()
    if "groups" not in data:
        return {"error": "missing groups"}
    for name in data["groups"]:
        groups[name] = data["groups"][name]

    print(groups)
    return {"msg": "success"}


@app.route("/groups", methods=["GET"])
def get_groups():
    data = request.args.get("event_name")
    if data not in groups:
        return {"error": "event_name not found"}
    return {"group": json.loads(groups[data])}


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
    # Go delete all relevant preferences
    event_id = db.session.query(Event.id).filter(Event.name == data["event_name"]).all()
    for id in event_id:
        id = id[0]
        db.session.query(Preferences).filter(Preferences.event_id == id).delete()
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
            {
                "person": fernet.encrypt(code_data.encode()).decode(),
                "event_name": event_name,
                "person_name": person,
            }
        )
    return {"links": links}


@app.route("/form/<code>", methods=["POST"])
def post_form(code):
    if Config.FERMET_KEY == None or fernet == None:
        return {"error": "backend has no key set"}

    data_json = fernet.decrypt(code.encode()).decode()
    data = json.loads(data_json)
    event_name = data["event_name"]
    person = data["person"]
    preferences = request.get_json()
    preferences = preferences["preferences"]

    event_id = (
        db.session.query(Event.id).filter(Event.name == data["event_name"]).first()
    )

    if not event_id:
        return {"error": "no event found"}

    pref = {"preferences": preferences}
    print(json.dumps(pref))

    new_pref = Preferences(
        name=person, preference=json.dumps(pref), event_id=event_id[0]
    )

    db.session.add(new_pref)
    db.session.commit()

    return {"msg": "success"}


@app.route("/events/calculate", methods=["GET"])
def get_events_calculate():
    event_name = request.args.get("event_name")
    if not event_name:
        return {"error": "missing event_name"}

    event_id = db.session.query(Event.id).filter(Event.name == event_name).first()

    if not event_id:
        return {"error": "event not found"}

    event_id = event_id[0]

    prefs_query = (
        db.session.query(Preferences.name, Preferences.preference)
        .filter(Preferences.event_id == event_id)
        .all()
    )

    roles_query = db.session.query(Event.roles).filter(Event.name == event_name).first()

    if not roles_query:
        return {"error": "event not found"}

    roles = roles_query[0]

    prefs = []
    for pref in prefs_query:
        new_pref = {"name": pref[0], "preference": json.loads(pref[1])["preferences"]}
        prefs.append(new_pref)

    res = generate_assignments(roles, prefs)

    return {"roles": res}


@app.route("/test")
def test():
    roles = [("Wand", 2), ("Potion", 1), ("Crystal Ball", 1)]
    preferences = [
        {"name": "Dorian", "preference": [1, 2, 3]},
        {"name": "Dani", "preference": [3, 2, 1]},
        {"name": "Monica", "preference": [2, 1, 3]},
        {"name": "Nico", "preference": [3, 2, 1]},
    ]
    res = generate_assignments(roles, preferences)
    return json.dumps(res)
