class MaxPriorityQueue(object):

    def __init__(self, taskPriorityDict: dict):
        self.__taskPriorityDict = taskPriorityDict
        self.__taskPriorityQueue = []

    def __max_priority(self):
        self.__taskPriorityQueue.sort(reverse=True)

    def createPriorityQueue(self) -> list:
        for task, priority in self.__taskPriorityDict.items():
            self.__taskPriorityQueue.append((priority, task))

        self.__max_priority()

        return self.__taskPriorityQueue

    def __str__(self):
        return str(self.__taskPriorityQueue)
