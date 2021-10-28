from flask import jsonify, request
from functools import wraps
from flask.helpers import send_from_directory
from flask import Flask
import os
global BLUE, BLACK

from PyBot import PyBot

app = Flask(__name__)

# params function from https://arunmozhi.in/2019/07/26/simplifying-json-parsing-in-flask-routes-using-decorators/
# param decorator to check valid payloads
def required_params(required):
    def decorator(fn):
        """Decorator that checks for the required parameters"""
 
        @wraps(fn)
        def wrapper(*args, **kwargs):
            payload = request.get_json()
            missing = [field for field in required.keys()
                       if field not in payload]
            if missing:
                response = {
                    "message": "Request JSON is missing some required params",
                    "missing": missing
                }
                return jsonify(response), 400
            wrong_types = [typ for typ in required.keys()
                           if not isinstance(payload[typ], required[typ])]
            if wrong_types:
                response = {
                    "message": "Data types in the request JSON doesn't match the required format",
                    "param_types": {key: str(val) for key, val in required.items()}
                }
                return jsonify(response), 400
            return fn(*args, **kwargs)
        return wrapper
    return decorator

# endpoint to move bot to x y point
# payload = {"x":int,"y":int}
@app.route('/moveTo',methods=['POST'])
@required_params({"x": int,"y": int})
def index():
    # payload = loads(request.form.get('payload'))
    payload = request.get_json()
    x = payload['x']
    y = payload['y']
    bot.moveTo(int(x), int(y))
    return bot.getImage()

# need to replace this and instead of having an endpooint that is call instead  the robot should post an image when it is ready
# this way the app can all up the


@app.route('/camera', methods=['GET'])
def get_image():
    bot.getImage()
    # send_file pil.getbytes
    # flask command send_file  bytes_io
    resp = send_from_directory(os.path.join('./'), 'camera.jpg')
    # resp = make_response(image.load(),200)
    resp.headers.set('Content-Type', 'image/jpeg')
    return resp

# endpoint to get status


@app.route('/status', methods=['GET'])
def get_status():
    resp = jsonify(bot.updateStatus())
    return resp

# GET allows browser to trigger scan


@app.route('/scan', methods=['POST', 'GET'])
def get_scan():
    # a true bot scan will need to be implimented on to it's own thread so app and server aren't waiting for robot to finish
    bot.scan()
    resp = jsonify("OK")
    return resp, 200   



if __name__ == "__main__":
    bot = PyBot(0, 0)
    app.run(port=5050)
