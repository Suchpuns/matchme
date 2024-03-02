
## Quickstart Documentation
Follow quickstart
https://flask.palletsprojects.com/en/3.0.x/installation/

## Running the application

Setup
``` For mac/linux/wsl
Create Env  -  $ python3 -m venv .env
Activate    -  $ . .venv/bin/activate
Install     -  $ (.venv) pip install -r requirements.txt
```

Running the app
```
flask run --debug --port 5000
```

## Types
```
PeoplePref = {
  name: Str
  preferences: int[] (index i represents a persons preference for role at index i in the roles list. 1 is best, 2 is next best and so on)
}

```


## Backend endpoints

**GET: /calculate**
```
people: List of [ PeoplePref ]
roles: List of [ {role_name: str, n_roles: int } ]

Returns [ {role_name: str, person_name: str} ]
```

**GET: /events**
```
Returns str[] # Returns all the event names
```

**POST: /events**
```
event_name: str
```
**DELETE: /events**
```
event_name: str
Returns succssful: Boolean
```

**GET: /events/roles**
```
event_name: str
Returns, roles: List of [ {role_name: str, n_roles: int } ]
```
**POST: /events/roles**
```
event_name: str
roles: List of [ {role_name: str, n_roles: int } ]
```
**PUT: /events/roles**
```
event_name: str
roles: List of [ {role_name: str, n_roles: int } ]
```

**GET: /events/form_links**
```
event_name: str
people: str[]

Returns str[] # Array of form links
```
**GET: /form/:code** # e.g. /form/OIfjdd43FD
```
Returns {name: str, str[]} # Array of role names. Empty if incorrect code.
```
**POST: /form/:code**
```
preferences: int[] (index i represents a persons preference for role at index i in the roles list. 1 is best, 2 is next best and so on)
```
