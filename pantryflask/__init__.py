from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from zeroconf import ServiceInfo, Zeroconf

from pantryflask.config import FlaskConfig
from pantryflask.auth import token_auth, generate_pairing_code, generate_user_token
from pantryflask.db import db
from pantryflask.pantry_api import bp as pantry_bp
from pantryflask.robot_api import bp as robot_bp
from pantryflask.util import bp as util_bp

def app_factory():
    app = Flask(__name__)
    app.config.from_object(FlaskConfig)

    db.init_app(app)
    migrate = Migrate(app, db)

    @app.route('/')
    def get_root():
        return jsonify({'test': 'test'})

    @app.route('/cert', methods=['GET'])
    def get_cert():
        pass

    @app.route('/pair', methods=['GET'])
    def pair_device():
        code = request.args.get('code')
        token = generate_user_token(code)
        if token == None:
            return jsonify(None), 401

        return jsonify(token), 201

    @app.route('/pair', methods=['POST'])
    @token_auth.login_required(role=['user'])
    def get_pairing_code():
        return jsonify(generate_pairing_code)

    app.register_blueprint(pantry_bp)
    app.register_blueprint(robot_bp)
    app.register_blueprint(util_bp)

    return app, db, migrate

app, db, migrate = app_factory()