import socket
import json
from flask import Flask
from zeroconf import ServiceInfo, Zeroconf

App = Flask(__name__)
