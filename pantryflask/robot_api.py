from flask import Blueprint, jsonify, make_response
from flask.helpers import send_from_directory

from flask_sqlalchemy import SQLAlchemy
from markupsafe import escape
import os
from pantryflask.db import db

bp = Blueprint('robot', __name__, url_prefix='/robot')

@bp.route('/presets', methods=['GET'])
def get_presets():
    pass

@bp.route('/presets', methods=['POST'])
def add_preset():
    pass

@bp.route('/presets/<int:presetID>', methods=['POST'])
def call_preset(presetID):
    pass

@bp.route('/presets/<int:presetID>', methods=['PUT'])
def update_preset(presetID):
    pass

@bp.route('/presets/<int:presetID>', methods=['DELETE'])
def delete_preset(presetID):
    pass

@bp.route('/control', methods=['POST'])
def call_position():
    pass

@bp.route('/control/<string:direction>', methods=['POST'])
def call_direction(direction):
    pass

@bp.route('/camera', methods=['GET'])
def get_image():
    response = send_from_directory(os.path.join('.', 'static'), 'camera.jpg')
    response.headers.set('Cache-Control', 'max-age=86400')
    return response


@bp.route('/camera', methods=['POST'])
def put_image():
    pass