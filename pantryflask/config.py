import os
basedir = os.path.abspath(os.path.dirname(__file__))

class FlaskConfig(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or "CHANGEME"
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

if FlaskConfig.SECRET_KEY == "CHANGEME": print(f"\x1b[93m ! SECRET_KEY is {FlaskConfig.SECRET_KEY}," \
    " change before deploying to prod! (and remove this warning!)\x1b[0m")