from flask import Blueprint, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from markupsafe import escape
from json import loads

from pantryflask.db import db
from pantryflask.models import PantryAudit, PantryItem

bp = Blueprint('pantry', __name__, url_prefix='/pantry')

@bp.route('/', methods=['GET'])
def get_items():
    return jsonify({'pantry': 'pantry'})

@bp.route('/knownitems/', methods=['GET'])
def get_allitems():
    data = []
    for item in PantryItem.query.all():
        data.append(item.to_dict())
    return jsonify(data)

@bp.route('/', methods=['POST'])
def add_item():
    payload = loads(request.form.get('payload'))
    img = request.files['image'] or None
    new_item = PantryItem(item_label=payload['label'], item_quantity=payload['quantity'], item_image=img.read())
    db.session.add(new_item)
    db.session.commit()
    return jsonify("OK")

@bp.route('/knownitems/<int:itemID>', methods=['GET'])
@bp.route('/<int:itemID>', methods=['GET'])
def get_item(itemID):
    pass

@bp.route('/knownitems/<int:itemID>/img', methods=['GET'])
@bp.route('/<int:itemID>/img', methods=['GET'])
def get_item_image(itemID):
    item = PantryItem.query.get(itemID)
    image = item.item_image
    response = make_response(image)
    response.headers.set('Content-Type', 'image/jpeg')

    return response

@bp.route('/knownitems/<int:itemID>', methods=['PUT'])
@bp.route('/<int:itemID>', methods=['PUT'])
def update_item(itemID):
    pass

@bp.route('/<int:itemID>', methods=['DELETE'])
def delete_item(itemID):
    pass

@bp.route('/knownitems/<int:itemID>', methods=['DELETE'])
def delete_item_perm(itemID):
    item = PantryItem.query.get(itemID)
    db.session.delete(item)
    db.session.commit()
    return jsonify("OK")
