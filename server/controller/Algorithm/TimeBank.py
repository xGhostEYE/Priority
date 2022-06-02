# This class store and handle the time user wants to allocate for studies.
class TimeBank(object):
    # This variable stores the time user wants to spent studying everyday.
    __everydayTimeBank: float

    # This variable stores the time user wants to spent studying today.
    __todayTimeBank: float

    """Right now, I am not sure how am I going to be using this constructor so for now I am going to keep it basic"""
    def __init__(self, time):
        self.__everydayTimeBank = time

    def setTodayTimeBank(self, time):
        self.__todayTimeBank = time
        return None

    # returns the the time user wants to spent studying everyday.
    def getTimeBank(self):
        if self.__everydayTimeBank != self.__todayTimeBank:
            return self.__todayTimeBank

        else:
            return self.__everydayTimeBank
