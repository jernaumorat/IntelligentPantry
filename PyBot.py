import pygame
import math
# Default values
width =1200
height = 800
BLUE =      (0,   0, 255)
BLACK =      (0,   0, 0)
minsize = 20
maxsize = 50
win = pygame.display.set_mode((width, height))
class PyBot:
    def __init__(self, x, y, r):
        
        self.x = x
        self.y = y
        self.radius = r
        self.agl = 90
        self.ad = 10
        self.x2 = x + r
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
        if self.radius < maxsize: self.radius += 5
    def back(self):
        self.erase()
        if self.radius > minsize: self.radius -= 5

    def setpos2(self):
        rad = self.agl*(math.pi/180)            #convert degrees to radians
        self.x2 =math.sin(rad) *self.radius+self.x      # calc cos of angle for x2
        self.y2 =math.cos(rad) *self.radius+self.y      # calc sin of angle for y2


