# This class store and handle the difficulty of a task.
class Difficulty(object):

    # stores the difficulty assigned to a task by the user.
    __difficulty: int

    """Right now, I am not sure how am I going to be using this constructor so for now I am keeping it simple"""
    def __init__(self, difficulty: int):
        if difficulty < 0:
            self.__difficulty = 0
        elif difficulty > 10:
            self.__difficulty = 10
        else:
            self.__difficulty = difficulty

    def getDifficulty(self) -> int:
        return self.__difficulty

    def setDifficulty(self, difficulty: int) -> None:
        if difficulty < 0:
            self.__difficulty = 0
        elif difficulty > 10:
            self.__difficulty = 10
        else:
            self.__difficulty = difficulty

    def __str__(self):
        return str(self.__difficulty)
