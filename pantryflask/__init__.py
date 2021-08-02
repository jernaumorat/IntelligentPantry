import socket
import json
from flask import Flask, jsonify
from zeroconf import ServiceInfo, Zeroconf

from pantryflask.auth import token_auth

app = Flask(__name__)

@app.route('/')
@token_auth.login_required
def get_root():
    return jsonify({'test': 'test'})
