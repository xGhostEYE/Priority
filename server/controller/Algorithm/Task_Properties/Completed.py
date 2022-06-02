class Completed(object):
    __completed: bool

    def __init__(self, completed: bool):
        self.__completed = completed

    def isCompleted(self) -> bool:
        return self.__completed

    def updateCompletion(self, completed: bool) -> None:
        self.__completed = completed

    def __str__(self):
        return str(self.__completed)


if __name__ == "__main__":

    completed = Completed(True)
    print(completed)

    completed.updateCompletion(False)
    print(completed)
