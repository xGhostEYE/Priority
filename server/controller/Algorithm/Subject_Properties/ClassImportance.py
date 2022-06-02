class ClassImportance(object):
    # This holds the value of the class to the user
    __value: int

    def __init__(self, value: int):
        if value < 0:
            self.__value = 0

        elif value > 5:
            self.__value = 5

        else:
            self.__value = value

    def getValue(self) -> int:
        return self.__value

    def setValue(self, value: int):
        if value < 0:
            self.__value = 0

        elif value > 5:
            self.__value = 5

        else:
            self.__value = value

    def __str__(self):
        return str(self.__value)


if __name__ == "__main__":

    importance = 5
    class_importance = ClassImportance(importance)

    if class_importance.getValue() != importance:
        print("Error in Initialization or in getMethod")

    new_importance = 4
    class_importance.setValue(new_importance)

    if class_importance.getValue() == importance:
        print("Error in setMethod")

    elif class_importance.getValue() != new_importance:
        print("Error in getMethod")

    print(class_importance)
