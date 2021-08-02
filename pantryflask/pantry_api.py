from flask import Blueprint, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from markupsafe import escape

from pantryflask.db import db
from pantryflask.models import PantryAudit, PantryItem

bp = Blueprint('pantry', __name__, url_prefix='/pantry')

@bp.route('/', methods=['GET'])
def get_items():
    return jsonify({'pantry': 'pantry'})

@bp.route('/knownitems/', methods=['GET'])
def get_allitems():
    return jsonify(PantryItem.query.all())

@bp.route('/', methods=['POST'])
def add_item():
    payload = request.get_json()
    new_item = PantryItem(item_label=payload['label'],item_quantity=payload['quantity'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify("OK")

@bp.route('/knownitems/<int:itemID>', methods=['GET'])
@bp.route('/<int:itemID>', methods=['GET'])
def get_item(itemID):
    pass

@bp.route('/knownitems/<int:itemID>', methods=['PUT'])
@bp.route('/<int:itemID>', methods=['PUT'])
def update_item(itemID):
    pass

@bp.route('/<int:itemID>', methods=['DELETE'])
def delete_item(itemID):
    pass

@bp.route('/knownitems/<int:itemID>', methods=['DELETE'])
def delete_item_perm(itemID):
    pass
