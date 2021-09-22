import pygame
import math
# Default values
width =1200
height = 800
BLUE =      (0,   0, 255)
BLACK =      (0,   0, 0)

win = pygame.display.set_mode((width, height))
class PyBot:   
    def __init__(self, x, y):
        self.minsize = 20
        self.maxsize = 50
        self.x = x
        self.y = y
        self.radius = 20
        self.agl = 90
        self.ad = 10
        self.x2 = x + 20
        self.y2 = y 
        
    def draw(self):
        self.setpos2()
        pygame.draw.circle(win, BLUE, (self.x,self.y),self.radius,2)
        pygame.draw.line(win,BLUE,(self.x,self.y),(self.x2,self.y2),2)
        pygame.display.update()
    def erase(self):
        pygame.draw.circle(win, BLACK, (self.x,self.y),self.radius,2)
        pygame.draw.line(win,BLACK,(self.x,self.y),(self.x2,self.y2),2)

    def left(self):
        self.erase()
        if self.x > self.radius: self.x -= self.ad
    def right(self):
        self.erase()
        if self.x < width + self.radius: self.x += self.ad

    def up(self):
        self.erase()
        if self.y > self.radius: self.y -= self.ad
    def down(self):
        self.erase()
        if self.y < height + (self.radius): self.y += self.ad

    def tiltUp(self):
        self.erase()
        if self.agl > 45: self.agl -= self.ad
    def tiltDown(self):
        self.erase()
        if self.agl < 135: self.agl += self.ad 

    def forward(self):
        self.erase()
        if self.radius < self.maxsize: self.radius += 5
    def back(self):
        self.erase()
        if self.radius > self.minsize: self.radius -= 5

    def setpos2(self):
        rad = self.agl*(math.pi/180)                    # convert degrees to radians
        self.x2 =math.sin(rad) *self.radius+self.x      # calc cos of angle for x2
        self.y2 =math.cos(rad) *self.radius+self.y      # calc sin of angle for y2

# Init should initialise the screen
# Create moveTo
#   call screen to update either after updating xy or during animate
# Create getImg 
#   For a temp implimentation i shull gen img then display for short sec then reload normal screen
#   Can up dates this later to send the img via request back to the server
# Create scan
#   Should generate an array of json pantry items{'label:'label','quantity:000', 'position_x: 000','position_y: 000', 'image: img.jpg'}
#   
#   Notes need a way to validate that it is the server which is communicating with the server
#       to do this we could use decorater to encapsulate the bot functions

#   We have ben relieved of controling the tilt up and down and are simply worrying about moving to a given x and y

