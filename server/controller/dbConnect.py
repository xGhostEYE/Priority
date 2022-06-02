import mysql.connector as connector
import datetime as dt


class Database(object):

    def __init__(self, host="localhost", user="root", password="admin", database="cmpt370"):
        self.__host = host
        self.__user = user
        self.__password = password
        self.__database = database

        try:
            self.db = connector.connect(
                host=self.__host,
                user=self.__user,
                passwd=self.__password,
                database=self.__database
            )
            self.cursor = self.db.cursor()

        except connector.errors.ProgrammingError:
            print("Incorrect Password")

        except connector.errors.ProgrammingError:
            print("Incorrect Password")

        except connector.errors.InterfaceError:
            print("Incorrect Host")

        except AttributeError:
            print("Make Sure the user and Database are correct")


if __name__ == "__main__":
    db = Database()
    my_cursor = db.cursor

    my_cursor.execute("SELECT * FROM user")
    for x in my_cursor:
        print(x)
