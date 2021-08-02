# informed greatly by https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xxiii-application-programming-interfaces-apis

from flask import jsonify
from flask_httpauth import HTTPTokenAuth
from werkzeug.http import HTTP_STATUS_CODES
from werkzeug.wrappers import response

token_auth = HTTPTokenAuth()

@token_auth.verify_token
def verify_token(token):
    return True if (token == 'testtoken') else None

@token_auth.error_handler
def token_error(status):
    response = jsonify(None)
    response.status_code = status
    return response
