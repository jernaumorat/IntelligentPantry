import pygame
import time
from flask import Blueprint, jsonify, request, make_response
from json import loads
from flask import Flask
from Bot import Bot
global BLUE, BLACK

from PyBot import PyBot

app = Flask(__name__)

# endpoint to move bot to x y point
# payload = {"x":int,"y":int}
@app.route('/moveTo',methods=['POST'])
def index():
    payload = loads(request.form.get('payload'))
    x = payload['x']
    y = payload['y']
    bot.moveTo(int(x), int(payload['y']))
    return "",200


if __name__ == "__main__":        
    pygame.init()
    bot = PyBot(100, 100)
    app.run()
