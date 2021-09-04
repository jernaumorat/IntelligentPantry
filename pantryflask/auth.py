# informed greatly by https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xxiii-application-programming-interfaces-apis
import secrets
import string

from flask import jsonify
from flask_httpauth import HTTPTokenAuth
from werkzeug.http import HTTP_STATUS_CODES
from werkzeug.wrappers import response

from pantryflask.db import db
from pantryflask.models import AuthToken, PairingCode

token_auth = HTTPTokenAuth(scheme='bearer')

def generate_pairing_code():
    code = ''.join(secrets.choice(string.ascii_uppercase) for i in range(4))
    db.session.add(PairingCode(pair_code=code))
    db.session.commit()

    return code

def generate_user_token(code):
    c = PairingCode.query.get(code)
    if c == None:
        return None

    token = secrets.token_hex(32)
    db.session.add(AuthToken(token_data=token, token_class='user'))
    db.session.delete(c)
    db.session.commit()

    return token

def generate_system_token(token):
    if token == "generate":
        token = secrets.token_hex(32)
    db.session.add(AuthToken(token_data=token, token_class='system'))
    db.session.commit()

    return token

@token_auth.verify_token
def verify_token(token):
    q = AuthToken.query.get(token)
    if q is None: return False
    return q.token_class

@token_auth.get_user_roles
def get_roles(token_class):
    return token_class

@token_auth.error_handler
def token_error(status):
    response = jsonify(None)
    response.status_code = status
    return response
