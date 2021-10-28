#! /bin/bash

URL="http://localhost:5000/pantry/"
LABEL=$1
QUANT=$2
IMAGE=$3
X=$4
Y=$5

echo $LABEL
echo $QUANT
echo $IMAGE
echo $X
echo $Y

PAYLOAD='[{"label":"'$LABEL'","quantity":"'$QUANT'","item_x":"'$X'","item_y":"'$Y'","image_key":"'$IMAGE'"}]'

echo $PAYLOAD
curl -vv -X POST -F "payload=$PAYLOAD" -F "image=@$IMAGE" $URL
#add item command syntax: ./add-item.sh 'label' qty 'image.jpg' X Y
# eg ./add-item.sh 'apples' 5 'apples.jpg' 5 'apples.jog' 10 25
