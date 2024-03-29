from flask import Blueprint, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from json import loads
from pantryflask.valid_json import pantry_post_required_params
from pantryflask.db import db
from pantryflask.models import PantryItem
from pantryflask.auth import token_auth

bp = Blueprint('pantry', __name__, url_prefix='/pantry')

@bp.route('/', methods=['GET'])
@token_auth.login_required(role=['user'])
def get_allitems():
    data = []
    for item in PantryItem.query.all():
        data.append(item.to_dict(summary=True))
    
    resp = jsonify(data)
    if data == []:
        return resp, 204
    
    return resp

# POST a list of items with images attached

# Function expects a form dict with payload as the key and a list of dicts as its values as follows
#   {'payload' : [{label:string, quantity:int,item_x:intitem_y:int,image_key:string},{label:string, quantity:int,item_x:intitem_y:int,image_key:string},.....]}
#   the request should also attach jpg files for each item with image_key as each images key
@bp.route('/', methods=['POST'])
@token_auth.login_required(role=['system'])
@pantry_post_required_params({"label": str,"quantity":int,"item_x":int,"item_y":int,"image_key":str})
def add_items():
    payload = loads(request.form.get('payload'))
    for data in payload:
        img = request.files[data['image_key']] or None
        new_item = PantryItem(item_label=data['label'], item_quantity=data['quantity'], item_x=data['item_x'], item_y=data['item_y'], item_image=img.read())
        db.session.add(new_item)
    db.session.commit()
    resp = payload
    return "resp", 201

@bp.route('/<int:itemID>', methods=['GET'])
@token_auth.login_required(role=['user'])
def get_item(itemID):
    item = PantryItem.query.get_or_404(itemID)
    resp = jsonify(item.to_dict(summary=False))

    return resp

@bp.route('/<int:itemID>/img', methods=['GET'])
@token_auth.login_required(role=['user'])
def get_item_image(itemID):
    item = PantryItem.query.get_or_404(itemID)
    image = item.item_image
    
    resp = make_response(image)
    resp.headers.set('Content-Type', 'image/jpeg')
    resp.headers.set('Cache-Control', 'max-age=86400')

    return resp

@bp.route('/', methods=['DELETE'])
@token_auth.login_required(role=['system'])
def delete_allitems():
    for item in PantryItem.query.all():
        db.session.delete(item)
        db.session.commit()
    
    resp = jsonify("OK")

    return resp
