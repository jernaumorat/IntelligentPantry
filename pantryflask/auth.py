# informed greatly by https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xxiii-application-programming-interfaces-apis

from flask import jsonify
from flask_httpauth import HTTPTokenAuth
from werkzeug.http import HTTP_STATUS_CODES
from werkzeug.wrappers import response

from pantryflask.db import db
from pantryflask.models import AuthToken

token_auth = HTTPTokenAuth(scheme='bearer')

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
