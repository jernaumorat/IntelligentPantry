import click
from flask import Blueprint

from pantryflask.db import db
from pantryflask.models import AuthToken

bp = Blueprint('util', __name__, cli_group=None)

@bp.cli.command("add-system-token")
@click.argument("token")
def add_system_token(token):
    db.session.add(AuthToken(token_data=token, token_class='system'))
    db.session.commit()