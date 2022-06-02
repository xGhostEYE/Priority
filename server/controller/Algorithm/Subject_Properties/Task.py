from Algorithm.Task_Properties import Deadline as Dd
from Algorithm.Task_Properties import Difficulty as Df
from Algorithm.Task_Properties import Type as Tp
from Algorithm.Task_Properties import WeightedGrade as Wg
from Algorithm.Task_Properties import Completed as Cd
from Algorithm.Subjects import SubjectInstance as Si


# this class creates the task of the Subject
class Task(object):
    # This stores the deadline of the task
    __deadline: Dd.Deadline

    # This stores the Difficulty of the task
    __difficulty: Df.Difficulty

    # This stores the Type of the task
    __typeTask: Tp.Type

    # This stores the weightage of the task
    __weightage: Wg.WeightedGrade

    # This stores if the task has been completed or not
    __completed: Cd.Completed

    # This stores the taskID of the task received from the database
    __taskID: int

     # This stores the second spent on a task.
    __secondSpent: int

    def __init__(self, typeTask: Tp.Type, deadline: Dd.Deadline, difficulty: Df.Difficulty,
                 weightage: Wg.WeightedGrade, completed: Cd.Completed, taskID: int, secondSpent: int, subject=None):
        self.__typeTask = typeTask
        self.__difficulty = difficulty
        self.__deadline = deadline
        self.__weightage = weightage
        self.__completed = completed
        self.__taskID = taskID
        self.__className = subject
        self.__secondSpent = secondSpent

    # TODO """If we can use normal function to update the details then we must remove the update function"""

    def setClass(self, className):
        self.__className = className

    def getClass(self):
        return self.__className

    def getSecondSpent(self):
        return self.__secondSpent
        
    def getTaskID(self):
        return self.__taskID

    def deadline(self):
        return self.__deadline

    def updateDeadline(self, deadline: Dd.Deadline):
        self.__deadline = deadline
        return None

    def difficulty(self):
        return self.__difficulty

    def updateDifficulty(self, difficulty: Df.Difficulty):
        self.__difficulty = difficulty
        return None

    def taskType(self):
        return self.__typeTask

    def updateTask(self, typeTask: Tp.Type):
        self.__typeTask = typeTask
        return None

    def weightedGrade(self):
        return self.__weightage

    def updateWeightedGrade(self, weightage: Wg.WeightedGrade):
        self.__weightage = weightage
        return None

    def completed(self):
        return self.__completed

    def updateCompletion(self, completed: Cd.Completed):
        self.__completed = completed
        return None

    def __lt__(self, other):
        return other

    def __gt__(self, other):
        return self

    def __str__(self):
        if self.__className is not None:
            return self.__className.__str__() + " " + self.__typeTask.__str__() + " " + self.__deadline.__str__() + " " + \
                   self.__completed.__str__()
        else:
            return self.__typeTask.__str__() + " " + self.__deadline.__str__() + " " + self.__completed.__str__()
