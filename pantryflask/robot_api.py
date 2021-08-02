from flask import Blueprint, jsonify
from markupsafe import escape

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
