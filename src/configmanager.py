import json

class ConfigManager:
    def __init__(self, json_path):
        with config_file as open(json_path, 'r'):
            config_dict = json.load(config_file)

        self.SERVER_PORT = config_dict['network']['port']
        self.SERVER_URL = config_dict['network']['url']
        self.SERVER_IP = config_dict['network']['ip']
        self.CERT_NAME = config_dict['setup']['cert_name']
