import socket
import json
from flask import Flask, jsonify
from zeroconf import ServiceInfo, Zeroconf

from pantryflask.auth import token_auth
from pantryflask.pantry_api import bp as pantry_bp
from pantryflask.robot_api import bp as robot_bp

def app_factory():
    app = Flask(__name__)
    app.register_blueprint(pantry_bp)
    app.register_blueprint(robot_bp)

    @app.route('/')
    @token_auth.login_required
    def get_root():
        return jsonify({'test': 'test'})

    @app.route('/cert', methods=['GET'])
    def get_cert():
        pass

    @app.route('/pair', methods=['GET'])
    def pair_device():
        pass

    @app.route('/pair', methods=['POST'])
    @token_auth.login_required
    def generate_pairing_codes():
        pass

    return app

