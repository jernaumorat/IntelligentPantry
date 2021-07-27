#! /bin/bash


export FLASK_APP=src/app
export FLASK_ENV=development
export FLASK_RUN_PORT=`cat ./src/config.json | jq '.network.port'`

python3 -m flask run
