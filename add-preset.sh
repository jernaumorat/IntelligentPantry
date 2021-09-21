#! /bin/bash

URL="http://localhost:5000/robot/presets"
LABEL=$1
X=$2
Y=$3

echo $LABEL
echo $X
echo $Y

PAYLOAD='{"label":"'$LABEL'","preset_x":"'$X'","preset_y":"'$Y'"}'

echo $PAYLOAD
curl -vv -X POST -F "payload=$PAYLOAD" $URL
# syntax: ./add-item.sh 'lable' preset_x preset_y
# eg ./add-item.sh 'Middle' 50 50