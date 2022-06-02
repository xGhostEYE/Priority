import datetime as dt


# This class store and handle the deadline of a task.
class Deadline(object):
    """I could have also used the DateTime module of python, but I am not sure that it is not going to give an error
     in the future. Since we are planning to run python in JavaScript program for now I have decided to use a simpler version.
     But if everything goes well we can change it to a slightly more complex design"""

    # this variable stores if the deadline is know or not
    __isKnown: bool

    # this variable stores the day on which the assignment is due.
    __day: int

    # this variable stores the month in which the assignment is due.
    __month: int

    # this variable stores the year in which the assignment is due.
    __year: int

    """Right now, I am not sure how am I going to be using this constructor so for now I am leaving it blank"""

    def __init__(self, known: bool, day: int, month: int, year: int):
        self.__isKnown = known
        self.__day = day
        self.__month = month
        self.__year = year

    def getDeadline(self):
        if self.__isKnown:
            return self.__day, self.__month, self.__year
        else:
            return 0

    def setDeadline(self, day: int, month: int, year: int):
        self.__day = day
        self.__month = month
        self.__year = year
        return None

    def dayLeft(self, today=dt.date.today()):
        due_date = dt.date(self.__year, self.__month, self.__day)

        time_left = due_date - today

        if time_left.days < 0:
            return -1

        return time_left.days

    def isDeadlineKnown(self):
        return self.__isKnown

    def __str__(self):
        return str((self.__day, self.__month, self.__year))


"""Note: A special case for the deadline class would be when the deadline of an assignment is not known.
In such case the priority should be zero."""
