import socket
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from zeroconf import ServiceInfo, Zeroconf

from pantryflask.config import FlaskConfig
from pantryflask.auth import token_auth
from pantryflask.db import db
from pantryflask.pantry_api import bp as pantry_bp
from pantryflask.robot_api import bp as robot_bp

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
        pass

    @app.route('/pair', methods=['POST'])
    @token_auth.login_required
    def generate_pairing_codes():
        pass

    app.register_blueprint(pantry_bp)
    app.register_blueprint(robot_bp)

    return app, db, migrate

app, db, migrate = app_factory()