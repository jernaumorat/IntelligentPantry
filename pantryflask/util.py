import click
from flask import Blueprint

from pantryflask.db import db
from pantryflask.models import AuthToken, PairingCode
from pantryflask.auth import generate_system_token

bp = Blueprint('util', __name__, cli_group=None)

@bp.cli.command("add-system-token")
@click.argument("token")
def add_system_token(token):
    print(generate_system_token(token))

@bp.cli.command("clear-tokens")
def clear_tokens():
    tokens = AuthToken.query.all()
    codes = PairingCode.query.all()
    for token in tokens:
        db.session.delete(token)
    for code in codes:
        db.session.delete(code)

    db.session.commit()