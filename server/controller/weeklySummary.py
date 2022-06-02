from Algorithm.Term import Term
import sys
import dbConnect
import datetime as dt
from summary import Summary

if __name__ == "__main__":

    if len(sys.argv)<2:
        print('Usage: python3', sys.argv[0], "Need userID of the user")
        sys.exit()

    term = Term.Term()

    user_id = sys.argv[1]

    mysql = dbConnect.Database()
    cursor = mysql.cursor
    summary = Summary(user_id)
    s_t = summary.summary_dict()
    time_bankList = []
    cursor.execute(f"SELECT * FROM userTimebank WHERE userID = {user_id}")
    day_of_the_week = dt.date.today().weekday()
    for values in cursor:
        for time in values[1:]:
            time_bankList.append(time)
    day_of_the_week = dt.date.today().weekday()
    today = dt.date.today()
    monday = today - dt.timedelta(day_of_the_week)
    dates = []
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for i in range(7):
        dates.append(monday + dt.timedelta(days=i))

    day = 0
    for date in dates:
        priorityToSubject = term.assignPriorityToTasks(s_t, date)
        priority = term.displayPriority(priorityToSubject)

        print("{\""+days[day]+"\":>")
        summary.display(priority=priority, time_bankList=time_bankList, day_of_the_week=day)
        print("}?")

        day += 1
        print()



