import pygame
from flask import Blueprint, jsonify, request, make_response
from flask.helpers import send_from_directory
from json import loads
from flask import Flask
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

@app.route('/camera',methods=['GET'])
def get_image():
    bot.getImage()
    resp = send_from_directory('./', 'temp_img.jpg')
    # resp = make_response(image.load(),200)    
    resp.headers.set('Content-Type', 'image/jpeg')
    return resp

if __name__ == "__main__":        
    pygame.init()
    bot = PyBot(0, 0)
    app.run()
