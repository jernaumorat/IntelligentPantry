from flask import Blueprint, jsonify, request, make_response
from flask.helpers import send_from_directory
from json import loads
from flask import Flask
import os
global BLUE, BLACK

from PyBot import PyBot

app = Flask(__name__)

# endpoint to move bot to x y point
# payload = {"x":int,"y":int}
@app.route('/moveTo',methods=['POST'])
def index():
    # payload = loads(request.form.get('payload'))
    payload = request.get_json()
    print(payload)
    x = payload['x']
    y = payload['y']
    print("moveTo completed: 200")
    bot.moveTo(int(x), int(y))
    return bot.getImage()

# need to replace this and instead of having an endpooint that is call instead  the robot should post an image when it is ready
# this way the app can all up the 
@app.route('/camera',methods=['GET'])
def get_image():
    bot.getImage()
    # send_file pil.getbytes
    #flask command send_file  bytes_io
    resp = send_from_directory(os.path.join('./'), 'camera.jpg')
    # resp = make_response(image.load(),200)    
    resp.headers.set('Content-Type', 'image/jpeg')
    return resp

# endpoint to get status
@app.route('/status',methods=['GET'])
def get_status():
    # bot.updateStatus()
    resp = jsonify(bot.getStatus())
    return resp   

# GET allows browser to trigger scan
@app.route('/scan',methods=['POST','GET'])
def get_scan():
    bot.scan()
    resp = jsonify("OK")
    return resp    

if __name__ == "__main__":
    bot = PyBot(0, 0)
    app.run(port=5050)
