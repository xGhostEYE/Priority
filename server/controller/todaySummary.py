import sys

from summary import Summary
from Algorithm.Term import Term
import dbConnect
import datetime as dt

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print('Usage: python3', sys.argv[0], "Need userID of the user")
        sys.exit()

    term = Term.Term()
    user_id = sys.argv[1]

    mysql = dbConnect.Database()
    cursor = mysql.cursor
    summary = Summary(user_id)
    s_t = summary.summary_dict()
    time_bankList = []
    cursor.execute(f"SELECT * FROM usertimebank WHERE userID = {user_id}")
    day_of_the_week = dt.date.today().weekday()
    for values in cursor:
        for time in values[1:]:
            time_bankList.append(time)

    priorityToSubject = term.assignPriorityToTasks(s_t, dt.date.today())
    priority = term.displayPriority(priorityToSubject)

    summary.display(priority=priority, time_bankList=time_bankList, day_of_the_week=day_of_the_week)

