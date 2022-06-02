# This class store and handle the type of task.
class Type(object):

    # stores the type of task.
    __type: str

    __number: int

    """Right now, I am not sure how am I going to be using this constructor so for now I am keeping it simple"""
    def __init__(self, taskType: str, taskName: str):
        self.__type = taskType
        self.__name = taskName

    def getType(self):
        return self.__type

    def setType(self, taskType: str):
        self.__type = taskType
        return None

    def getTaskName(self):
        return self.__name

    def setTaskName(self, name: str):
        self.__name = name
        return None

    def __str__(self):
        if self.__name != " ":
            return self.__name
        else:
            return self.__type
