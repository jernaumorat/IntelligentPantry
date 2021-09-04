import click
from flask import Blueprint

from pantryflask.db import db
from pantryflask.models import AuthToken
from pantryflask.auth import generate_system_token

bp = Blueprint('util', __name__, cli_group=None)

@bp.cli.command("add-system-token")
@click.argument("token")
def add_system_token(token):
    print(generate_system_token(token))