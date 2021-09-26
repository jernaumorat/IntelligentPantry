import math
import time
from PIL import Image
from Bot import Bot
import requests
# Default values

width =1200
height = 800
BLUE =      (0,   0, 255)
BLACK =      (0,   0, 0)
class PyBot(Bot):   
    VIEW_WIDTH  = 600
    VIEW_HIEGHT = 400    
    def __init__(self, x, y):
        self.x = x
        self.y = y
     
    def moveTo(self , x , y):
        self.x = x
        self.y = y  
        # should send Image and this should send an image off to the server
        return

    # x and y are 0-100 meaning % of total width/hieght
    def getImage(self):
        # open image and crop to size
        img = Image.open("pantry.jpg")
        img_width  = img.size[0]
        img_hieght = img.size[1]
        
        # the selectable screen  is full screen - the view
        # we also need to know where the offset is base on the % of selectable screen
        offset_x = (img_width - self.VIEW_WIDTH) /100 * self.x
        offset_y = (img_hieght - self.VIEW_HIEGHT) /100 * self.y
        cropped_img = img.crop((offset_x,offset_y,offset_x + self.VIEW_WIDTH, offset_y + self.VIEW_HIEGHT))        
        img.close()
        cropped_img.save("camera.jpg")
        
        files = {'image': open('./camera.jpg', 'rb')}
        # headers = {
        #     'authorization': "Bearer {token}"
        # }
        # response = requests.request("POST", url, files=files, headers=headers)
        # Need to move this hard coded address out into a env_var file
        response = requests.post('http://192.168.1.17:5000/robot/camera', files=files)

        print(response.text)
        return "200"
    
    # Todo scan pantry    
    def scan(self):
        pass
    
    # Todo system state scan /idle date and time
    def getStatus(self):
        pass   

# [x]Init should initialise the screen
#   [ ] fix screen problem(cannot move or click because the server runing the window may need call back when updating is required not 100% sure)
# [x]Create moveTo
#   [x]  call screen to update either after updating x y
#   [ ] fix screen not updating with out 1 sec sleep
# [ ]Create getImg 
# [ ]  For a temp implimentation i shull gen img then display for short sec then reload normal screen
# [ ]  Can up dates this later to send the img via request back to the server
# [ ]Create scan
# [ ]  Should generate an array of json pantry items{'label:'label','quantity:000', 'position_x: 000','position_y: 000', 'image: img.jpg'}
# [ ]  
# [ ]  Notes need a way to validate that it is the server which is communicating with the server
# [ ]      to do this we could use decorater to encapsulate the bot functions

# [ ]  We have ben relieved of controling the tilt up and down and are simply worrying about moving to a given x and y

