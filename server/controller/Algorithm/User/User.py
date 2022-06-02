 from Algorithm.Subjects import Major as mJ


class User(object):

    # first and the last name of the student
    __firstName: str
    __lastName: str

    # user's universities credential, his nsid and student number
    __nsid: str
    __studentNumber: int

    # user's major
    __majorSubject: mJ.Major

    def __init__(self, firstName: str, lastName: str, nsid: str, studentNumber: int, majorSubject: mJ.Major):
        self.__firstName = firstName
        self.__lastName = lastName
        self.__nsid = nsid
        self.__studentNumber = studentNumber
        self.__majorSubject = majorSubject

    def getName(self):
        return self.__firstName, self.__lastName

    def getNsid(self):
        return self.__nsid

    def getStudentNumber(self):
        return self.__studentNumber

    # This returns the major of the user
    def getMajor(self):
        """I am returning the entire the class instead of name because If in case I need to do some other operations
        I will be able to do them."""

        """Note: getMajor().getName() should just give the name of the major"""
        return self.__majorSubject
