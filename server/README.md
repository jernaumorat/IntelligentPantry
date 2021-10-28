# intpantry-server

The first time you work on this module, you must run the following commands:

```
python3 -m venv ./venv
source ./venv/bin/activate
pip3 install -r requirements.txt
```

Remember when working on this module, run `source ./venv/bin/activate` before attempting to execute, or _your build may fail or pollute the directory_. After work is complete, you can close your terminal or run `deactivate` to return your term to normal.

When running for the first time, you must initialise the database. Run the following commands in the top directory:
```
flask db init
flask db migrate
flask db upgrade
```

Then you may run `flask run --host=0.0.0.0` to run the server on your local network (so the app can access).