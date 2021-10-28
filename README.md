# Intelligent Pantry Project

This repository contains the entiriety of the WSU Professional Experience Intelligent Pantry Project, completed in Autumn 2021 by group PS2106: Nathaniel Munk, Blake Edwards, Bonita Sachdeva, and Sammy Haque.

`app` contains the mobile frontend, a React Native app built to target iOS (though tested and running on Android).

`server` contains the project backend, a Python Flask server. The API is documented in `API.md`, however is slightly outdated. Owing to the nature of Flask, the code is mostly self-documenting however, and the endpoints can be found in `pantry_api.py`, `robot_api.py`, and `__init__.py` under `server/pantryflask/`.

`robot_stub` contains the stand-in for the Intelligent Pantry robot/classification system. To populate the backend with items, run both then make a GET request to `[stub]/scan`. By default, this will be `http://localhost:5050/scan`.

Installation instructions for each submodule can be found under their directories.
