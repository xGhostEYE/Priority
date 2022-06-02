from Algorithm.Subjects import Subject as sB
from Algorithm.Subject_Properties import Tasks as Tk
from Algorithm.Subject_Properties import ClassImportance as Ci


class SubjectInstance(object):

    # this holds the detail about the main subject such as "CMPT", "MATH" e.t.c
    __subject: sB.Subject

    # this holds the detail about the instance of the subject such as 317, 370, 110 e.t.c
    __instanceNumber: int

    # This stores the information about Tasks in the course
    __tasks: Tk.Tasks

    # This stores the information about CurrentGrade
    __classImportance: Ci.ClassImportance

    def __init__(self, subject: sB.Subject, instanceNumber: int, tasks: Tk.Tasks,
                 classImportance: Ci.ClassImportance):
        self.__subject = subject
        self.__instanceNumber = instanceNumber
        self.__tasks = tasks
        self.__classImportance = classImportance

    def __str__(self):
        return self.__subject.getName() + str(self.__instanceNumber)

    def getSubject(self):
        return self.__subject

    def getInstanceNumber(self):
        return self.__instanceNumber

    def getTasks(self) -> Tk.Tasks:
        return self.__tasks

    def getClassImportance(self):
        return self.__classImportance

    def updateSubject(self):
        # TODO
        pass

    def updateInstanceNumber(self):
        # TODO
        pass

    def updateTasks(self):
        # TODO
        pass

    def updateClassImportance(self):
        # TODO
        pass
