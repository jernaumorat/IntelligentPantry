from flask import Blueprint
from markupsafe import escape

bp = Blueprint('pantry', __name__, url_prefix='pantry')

@bp.route('/', methods=('GET'))
def get_items():
    pass

@bp.route('/knownitems/', methods=('GET'))
def get_():
    pass

@bp.route('/', methods=('POST'))
def add_item():
    pass

@bp.route('/knownitems/<int:itemID>', methods=('GET'))
@bp.route('/<int:itemID>', methods=('GET'))
def get_item(itemID):
    pass

@bp.route('/knownitems/<int:itemID>', methods=('PUT'))
@bp.route('/<int:itemID>', methods=('PUT'))
def update_item(itemID):
    pass

@bp.route('/<int:itemID>', methods=('DELETE'))
def delete_item(itemID):
    pass

@bp.route('/knownitems/<int:itemID>', methods=('DELETE'))
def delete_item_perm(itemID):
    pass
