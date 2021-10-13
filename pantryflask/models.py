from datetime import datetime, timedelta
from base64 import encodebytes
from enum import unique
from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy.ext.declarative.api import declared_attr

from pantryflask.db import db

class PantryItem(db.Model):
    __table_args__ = {'sqlite_autoincrement': True}
    item_id = db.Column(db.Integer, primary_key=True)
    item_label = db.Column(db.String, index=True, nullable=False)
    item_image = db.Column(db.LargeBinary)
    item_quantity = db.Column(db.Integer, index=True, nullable=False)
    item_x = db.Column(db.Integer, default=0, nullable=False)
    item_y = db.Column(db.Integer, default=0, nullable=False)

    def to_dict(self, summary):
        data = {
            'id': self.item_id,
            'label': self.item_label,
            'quantity': self.item_quantity
        }
        if not summary:
            data['x'] = self.item_x
            data['y'] = self.item_y

        return data

class RobotPreset(db.Model):
    __table_args__ = {'sqlite_autoincrement': True}
    preset_id = db.Column(db.Integer, primary_key=True)
    preset_label = db.Column(db.String)
    preset_x = db.Column(db.Integer, nullable=False)
    preset_y = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        data = {
            'presetId': self.preset_id,
            'label': self.preset_label,
            'presetX': self.preset_x,
            'presetY': self.preset_y
        }

        return data

class PairingCode(db.Model):
    pair_code = db.Column(db.String, primary_key=True)
    pair_expiry = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        data = {
            'code': self.pair_code,
            'expiry': self.pair_expiry,
        }

        return data


class AuthToken(db.Model):
    token_data = db.Column(db.String, primary_key=True)
    token_class = db.Column(db.String, nullable=False)
    token_birth = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        data = {
            'id': self.token_id,
            'token': self.token_data,
            'tokBirth': self.token_birth
        }

        return data

class SystemStatus(db.Model):
    status_time = db.Column(db.DateTime, primary_key=True)
    status_state = db.Column(db.String, nullable=False)

    def to_dict(self):
        data = {
            'time': self.status_time,
            'state': self.status_state
        }

        return data