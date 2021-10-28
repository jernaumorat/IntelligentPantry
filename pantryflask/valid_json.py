from flask import jsonify, request
from functools import wraps
from json import loads
#params function from https://arunmozhi.in/2019/07/26/simplifying-json-parsing-in-flask-routes-using-decorators/
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

# altered to retrieve data and iterate payload data
# some values are spicificlly hard coded to work with pantry post
def pantry_post_required_params(required):
    def decorator(fn):
        """Decorator that checks for the required parameters"""
        @wraps(fn)
        def wrapper(*args, **kwargs):
            payload = loads(request.form.get('payload'))
            for data in payload:
                missing = [field for field in required.keys()
                        if field not in data]
                if missing:
                    response = {
                        "message": "Request JSON is missing some required params",
                        "missing": missing
                    }
                    return jsonify(response), 400
                wrong_types = [typ for typ in required.keys()
                            if not isinstance(data[typ], required[typ])]
                if wrong_types:
                    response = {
                        "message": "Data types in the request JSON doesn't match the required format",
                        "param_types": {key: str(val) for key, val in required.items()}
                    }
                    return jsonify(response), 400
                return fn(*args, **kwargs)
        return wrapper
    return decorator