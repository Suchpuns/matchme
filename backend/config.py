import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "you-will-never-guess"
    SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI")
    FERMET_KEY = os.environ.get("FERMET_KEY")
    BACKEND_URL = os.environ.get("BACKEND_URL")
