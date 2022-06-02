# This class store and handle the weightedGrade of the task.
class WeightedGrade(object):

    # this variable stores the current grade of the user
    __weightage: float

    """Right now, I am not sure how am I going to be using this constructor so for now I am leaving it blank"""

    def __init__(self, weightage: float):
        self.__weightage = weightage

    def setWeightage(self, weightage: float):
        self.__weightage = weightage
        return None

    def getWeightage(self) -> float:
        return self.__weightage

    def __str__(self):
        return str(self.__weightage)
