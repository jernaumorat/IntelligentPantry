from flask import Blueprint, jsonify, request, make_response
from flask.helpers import send_from_directory

from flask_sqlalchemy import SQLAlchemy
from markupsafe import escape
import os
from pantryflask.db import db
from pantryflask.models import RobotPreset
from json import loads

bp = Blueprint('robot', __name__, url_prefix='/robot')

@bp.route('/presets', methods=['GET'])
def get_presets():
    data = []
    for item in RobotPreset.query.all():
        data.append(item.to_dict())
    
    resp = jsonify(data)
    if data == []:
        return resp, 204
    
    return resp
    

@bp.route('/presets', methods=['POST'])
def add_preset():
    payload = loads(request.form.get('payload'))
    new_item = RobotPreset(preset_label=payload['label'], preset_x=payload['preset_x'], preset_y=payload['preset_y'])

    db.session.add(new_item)
    db.session.commit()

    resp = jsonify(new_item.to_dict())
    resp.headers.set('Location', f'{request.base_url}{new_item.preset_id}')
    
    return resp, 201

@bp.route('/presets/<int:presetID>', methods=['DELETE'])
def delete_preset(presetID):
    item = RobotPreset.query.get_or_404(presetID)

    db.session.delete(item)
    db.session.commit()

    resp = jsonify('OK')

    return resp

@bp.route('/control', methods=['POST'])
def call_position():
    payload = request.get_json()
    print(payload['x'], payload['y'])
    
    resp = jsonify(payload)
    
    return resp

@bp.route('/camera', methods=['GET'])
def get_image():
    response = send_from_directory(os.path.join('.', 'static'), 'camera.jpg')
    response.headers.set('Cache-Control', 'max-age=86400')
    response.headers.remove('Content-Disposition')
    response.headers.remove('Last-Modified')
    return response

@bp.route('/camera', methods=['POST'])
def put_image():
    pass