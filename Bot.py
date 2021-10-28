from abc import ABC, abstractmethod
class Bot(ABC):
    @abstractmethod
    def moveTo(self , x , y):
        pass

    # get robot camera image of pantry
    @abstractmethod
    def getImage(self):
        pass
    
    # scan pantry
    @abstractmethod
    def scan(self):
        pass
    
    # system state scan /idle date and time
    @abstractmethod
    def updateStatus(self):
        pass
    