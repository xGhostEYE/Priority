from Algorithm.Subject_Properties import Task as Tk


# This class stores a list of tasks
class Tasks(object):
    # This stores all the tasks or the list of tasks
    __tasks: list

    def __init__(self, tasks):
        self.__tasks = tasks

    def getTasks(self):
        return self.__tasks

    # TODO """If we can use getTasks function to update the details then we must remove the add and remove function"""
    def addTask(self, tasks: Tk.Task):
        self.__tasks.append(tasks)
        return None

    def removeTask(self, task: Tk.Task):
        self.__tasks.remove(task)
        return None

    def __str__(self):
        return str(self.__tasks)
