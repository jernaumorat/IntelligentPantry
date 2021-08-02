from datetime import datetime, timedelta

from flask_sqlalchemy import SQLAlchemy

from pantryflask.db import db

class PantryItem(db.Model):
    item_id = db.Column(db.Integer, primary_key=True)
    item_label = db.Column(db.String, index=True, nullable=False)
    item_image = db.Column(db.LargeBinary)
    item_quantity = db.Column(db.Integer, index=True, nullable=False)

class PantryAudit(db.Model):
    reciept_id = db.Column(db.Integer, primary_key=True)
    reciept_time = db.Column(db.DateTime, index=True, default=datetime.now(), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('pantry_item.item_id'))
    label_old = db.Column(db.String)
    label_new = db.Column(db.String)
    image_old = db.Column(db.LargeBinary)
    image_new = db.Column(db.LargeBinary)
    quant_old = db.Column(db.Integer)
    quant_new = db.Column(db.Integer)

class RobotPreset(db.Model):
    preset_id = db.Column(db.Integer, primary_key=True)
    preset_label = db.Column(db.String)
    preset_x = db.Column(db.Integer, nullable=False)
    preset_y = db.Column(db.Integer, nullable=False)

class PairingCode(db.Model):
    pair_code = db.Column(db.String, primary_key=True)
    pair_expiry = db.Column(db.DateTime, default=datetime.now() + timedelta(hours=1), nullable=False)

class AuthToken(db.Model):
    token_id = db.Column(db.Integer, primary_key=True)
    token_birth = db.Column(db.DateTime, default=datetime.now(), nullable=False)