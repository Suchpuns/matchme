
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

**POST: /calculate**
```
people: List of [ PeoplePref ]
roles: List of [ {role_name: str, n_roles: int } ]

Returns [ {role_name: str, person_name: str} ]
```
