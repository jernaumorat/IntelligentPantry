from flask import Blueprint, jsonify, request, make_response
from io import StringIO
from PIL import Image
from Bot import Bot
import json
import requests
import random

#  server IP and Authorization Bearer Token
URL = 'http://127.0.0.1:5000'
TOKEN = 'testtoken'
# need to ensure that a token has been added to the server
# to add token run :
# flask add-system-token testtoken
# where testtoken is the string you wish to use


class PyBot(Bot):
    VIEW_WIDTH = 600
    VIEW_HIEGHT = 400

    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.status = "idle"
        print('pybot init')

    def moveTo(self, x, y):
        self.x = x
        self.y = y
        return

    # x and y are 0-100 meaning % of total width/hieght
    def getImage(self):
        # open image and crop to size
        img = Image.open("pantry.jpg")
        img_width = img.size[0]
        img_hieght = img.size[1]

        # the selectable screen  is full screen - the view
        # we also need to know where the offset is base on the % of selectable screen
        offset_x = (img_width - self.VIEW_WIDTH) / 100 * self.x
        offset_y = (img_hieght - self.VIEW_HIEGHT) / 100 * self.y
        cropped_img = img.crop(
            (offset_x, offset_y, offset_x + self.VIEW_WIDTH, offset_y + self.VIEW_HIEGHT))
        img.close()
        cropped_img.save("camera.jpg")
        files = {'image': open('./camera.jpg', 'rb')}
        response = requests.post(
            URL+'/robot/camera', files=files, headers=self.getHeader())
        print(response.text)
        return "200"

    # Todo system state scan /idle date and time
    def updateStatus(self):
        payload = {'status_payload': json.dumps(self.status)}

        response = requests.post(
            URL+'/robot/status', json=payload, headers=self.getHeader())
        # response = requests.post('https://httpbin.org/post', json=payload)
        # response = requests.get('https://httpbin.org/post', json=payload)
        print(response.text)

    def sendItems(self):
        fullItemList = ['apple', 'banana', 'nutrigrain', 'rice', 'weetbix', 'coffee', 'tea', 'pasta', 'tuna',
                        'corn', 'beans', 'lentals', 'milk', 'sauce', 'sugar', 'salt', 'jam', 'migoreng', 'chocolate', 'eggs']

        # n number of unique items to be selected and added
        n = random.randint(5, 19)
        itemList = []
        for x in range(n):
            # index of item to add then pop added items to avoid duplicates
            item = random.choice(fullItemList)
            itemList.append(item)
        #  list of dict items
        files = {}
        filedescriptors = []
        dataList = []
        for item in itemList:
            dataList.append({
                'label': item,
                'quantity': random.randint(1, 10),
                'item_x': random.randint(0, 100),
                'item_y': random.randint(0, 100),
                'image_key': item + '.jpg'
            })
            # files[item+'.jpg']= (item + '.jpg','image/jpeg')
            files[item+'.jpg']= (item + '.jpg', open('./images/' + item + '.jpg', 'rb'),'image/jpeg')
        payload = {'payload':json.dumps(dataList)}        
        response = requests.post(URL+'/pantry/', files=files,data=payload, headers=self.getHeader())
        
        return 
    
    # Todo scan pantry    
    def scan(self):
        self.status = 'busy'
        self.updateStatus()
        response = requests.delete(URL+'/pantry/', headers=self.getHeader())
        self.sendItems()
        self.status = 'idle'
        self.updateStatus()
        return

    def getHeader(self):
        return {'Authorization': 'Bearer ' + TOKEN}
