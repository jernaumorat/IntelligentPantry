import socket, os, atexit
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask.helpers import send_from_directory, url_for
from zeroconf import ServiceInfo, Zeroconf

from pantryflask.config import FlaskConfig
from pantryflask.auth import token_auth, generate_pairing_code, generate_user_token
from pantryflask.models import AuthToken
from pantryflask.db import db
from pantryflask.pantry_api import bp as pantry_bp
from pantryflask.robot_api import bp as robot_bp
from pantryflask.util import bp as util_bp

ip = socket.inet_aton(socket.gethostbyname(socket.getfqdn()))

httpZconf = ServiceInfo(
        "_http._tcp.local.",
        "intpantry._http._tcp.local.",
        addresses=[ip],
        port=5000)

httpsZconf = ServiceInfo(
        "_https._tcp.local.",
        "intpantry._https._tcp.local.",
        addresses=[ip],
        port=5443)

zc = Zeroconf()
zc.register_service(httpZconf)
print('Service Registered:', httpZconf)

def app_factory(config={}):
    app = Flask(__name__)
    
    app.config.from_object(FlaskConfig) if config == {} else app.config.from_object(config)

    db.init_app(app)
    migrate = Migrate(app, db)

    @app.route('/')
    def get_root():
        links = []
        for rule in app.url_map.iter_rules():
            methods = ','.join(rule.methods)
            links.append((f'{rule}', methods, rule.endpoint))
        return jsonify(links)

    @app.route('/cert', methods=['GET'])
    def get_cert():
        response = send_from_directory(os.path.join('.', 'static'), 'ssr.crt')
        return response

    @app.route('/pair', methods=['GET'])
    def pair_device():
        if len(AuthToken.query.filter_by(token_class='user').all()) == 0:
            return jsonify(generate_pairing_code())

        code = request.args.get('code')
        token = generate_user_token(code)
        if token == None:
            return jsonify(None), 401

        return jsonify(token), 201

    @app.route('/pair', methods=['POST'])
    @token_auth.login_required(role=['user'])
    def get_pairing_code():
        return jsonify(generate_pairing_code())

    app.register_blueprint(pantry_bp)
    app.register_blueprint(robot_bp)
    app.register_blueprint(util_bp)

    return app, db, migrate

@atexit.register
def shutdown():
    zc.unregister_all_services()


app, db, migrate = app_factory()