import pygame
import time

global BLUE, BLACK

from PyBot import PyBot


pygame.init()

active = True

bot = PyBot(100, 100)
bot.draw()
print ("a = left\nd = right\nw = up\ns = down\nq or e = tilt\nr or f = forward/back")
while active:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            active = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_w:         # up down left right
                    bot.up()
            if event.key == pygame.K_s:                
                    bot.down()
            if event.key == pygame.K_a:  
                    bot.left()
            if event.key == pygame.K_d:
                    bot.right()

            # if event.key == pygame.K_e:         # tilt up       tilt down
            #         bot.tiltUp()
            # if event.key == pygame.K_q:
            #         bot.tiltDown()

            # if event.key == pygame.K_r:         # Forward       Back
            #         bot.forward()
            # if event.key == pygame.K_f:
            #         bot.back()

            bot.draw()

# Todo  create a Main function to initialise bot and run the flask server 