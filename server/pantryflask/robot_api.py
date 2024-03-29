import requests, os
from flask import Blueprint, jsonify, request
from flask.helpers import send_from_directory
from flask_sqlalchemy import SQLAlchemy
from markupsafe import escape
from json import loads
from pantryflask.valid_json import required_params
from pantryflask.db import db
from pantryflask.models import RobotPreset, SystemStatus
from pantryflask.auth import token_auth
from requests.exceptions import ConnectionError
from json import loads
from datetime import datetime

bp = Blueprint('robot', __name__, url_prefix='/robot')
url ='http://127.0.0.1:5050'

@bp.route('/presets', methods=['GET'])
@token_auth.login_required(role=['user'])
def get_presets():
    data = []
    for item in RobotPreset.query.all():
        data.append(item.to_dict())
    
    resp = jsonify(data)
    if data == []:
        return resp, 204
    
    return resp
    
@bp.route('/presets', methods=['POST'])
@token_auth.login_required(role=['user'])
@required_params({"label":str,"preset_x":int,"preset_y":int})
def add_preset():
    payload = request.get_json()
    new_item = RobotPreset(preset_label=payload['label'], preset_x=payload['preset_x'], preset_y=payload['preset_y'])    
    db.session.add(new_item)
    db.session.commit()

    resp = jsonify(new_item.to_dict())
    resp.headers.set('Location', f'{request.base_url}{new_item.preset_id}')
    
    return resp, 201

@bp.route('/presets/<int:presetID>', methods=['DELETE'])
@token_auth.login_required(role=['user'])
def delete_preset(presetID):
    item = RobotPreset.query.get_or_404(presetID)

    db.session.delete(item)
    db.session.commit()

    resp = jsonify('OK')

    return resp

@bp.route('/control', methods=['POST'])
@token_auth.login_required(role=['user'])
@required_params({"x": int,"y": int})
def call_position():
    payload = request.get_json()
    print(payload['x'], payload['y'])
    try:
        response = requests.post(url+ "/moveTo",json=payload)
    except ConnectionError:
        return "Bad Gateway",502
    
    return response.text

@bp.route('/camera', methods=['GET'])
@token_auth.login_required(role=['user'])
def get_image():
    response = send_from_directory(os.path.join('..', 'static'), 'camera.jpg')    
    response.headers.set('Content-Type', 'image/jpeg')
    response.headers.set('Cache-Control', 'max-age=0')
    response.headers.remove('Content-Disposition')
    response.headers.remove('Last-Modified')
    return response

@bp.route('/camera', methods=['POST'])
@token_auth.login_required(role=['system'])
def put_image():
    img_file = request.files['image']
    img_file.save(os.path.join('.', 'static', 'camera.jpg'))
    resp = jsonify('OK')
    return resp

# Send status to app
@bp.route('/status', methods=['GET'])
@token_auth.login_required(role=['user'])
def get_status():
    status = SystemStatus.query.order_by(SystemStatus.status_time.desc()).first()
    resp = jsonify(status.to_dict())
    return resp, 200

# Update database with status
@bp.route('/status', methods=['POST'])
@token_auth.login_required(role=['system'])
@required_params({"status_payload":str})
def update_status():
    payload = request.get_json()
    status_update = SystemStatus(status_time=datetime.now(), status_state=payload['status_payload'])
    db.session.add(status_update)
    db.session.commit()
    resp = jsonify("OK")
    return resp, 201

@bp.route('/scan', methods=['POST'])
@token_auth.login_required(role=['user'])
def start_scan():    
    try:
        resp = requests.post(url+'/scan')
    except ConnectionError:
        return "Bad Gateway",502
    resp = jsonify("OK")
    return resp, 200