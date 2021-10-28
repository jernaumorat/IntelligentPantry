import os
import tempfile
import json
import io

import pytest

from pantryflask import app_factory

class FlaskTestConfig(object):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:',
    SQLALCHEMY_TRACK_MODIFICATIONS = False,
    SECRETKEY = 'TESTING',
    TESTING = True,

@pytest.fixture
def client():
    db_fd, db_path = tempfile.mkstemp()
    testconfig = FlaskTestConfig
    testconfig.SQLALCHEMY_DATABASE_URI = f'sqlite:///{db_path}'
    app, db, migrate = app_factory(testconfig)

    db.init_app(app)

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client

    print(db_path)
    os.close(db_fd)
    os.unlink(db_path)

def test_empty_db(client):
    r = client.get('/pantry/')

    assert r.data is b''
    assert r.status_code is 204

def test_add_item(client):
    payload = {'label': 'testitem', 'quantity': 1}
    jpayload = json.dumps(payload)
    image = (io.BytesIO(b'image'), 'image.jpg')

    r = client.post('/pantry/', content_type='multipart/form-data', data={'image': image, 'payload': jpayload})
    assert r.status_code is 201

    r = client.get(f'/pantry/{json.loads(r.data)["id"]}')
    assert r.status_code is 200
    assert b'testitem' in r.data

