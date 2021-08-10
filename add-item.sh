#! /bin/bash

URL="http://localhost:5000/pantry/"
LABEL=$1
QUANT=$2
IMAGE=$3

echo $LABEL
echo $QUANT
echo $IMAGE

PAYLOAD='{"label":"'$LABEL'","quantity":"'$QUANT'"}'

echo $PAYLOAD
curl -vv -X POST -F "payload=$PAYLOAD" -F "image=@$IMAGE" $URL