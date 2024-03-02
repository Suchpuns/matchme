from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import psycopg2

from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app,db)

from app import routes
from app import models