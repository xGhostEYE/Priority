class Subject(object):
    # This stores the name of the subject
    __name: str

    def __init__(self, name: str):
        self.__name = name

    def getName(self) -> str:
        return self.__name

    def setName(self, name: str):
        self.__name = name

    def __str__(self):
        return self.__name
