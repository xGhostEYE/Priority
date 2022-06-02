# This is the page with the main and will run all the code.


from Algorithm.Term import Term
import dbConnect

term = Term.Term()
mysql = dbConnect.Database()
cursor = mysql.cursor


class Summary(object):

    def __init__(self, user_id):
        self.__user_id = user_id

    def summary_dict(self):
        try:
            difficulties, listCompleted, dueDays, dueMonths, dueYears, extension, secondSpent = [], [], [], [], [], [], []
            taskId = []

            cursor.execute(f"SELECT taskID, difficulty, finishedDate, extendDeadline, secondSpent"
                           f" FROM userTask WHERE userID ={self.__user_id}")

            for values in cursor:
                # print(values[0], values[1], values[2], values[3])
                taskId.append(values[0])
                difficulties.append(int(values[1]))

                if values[2] is None:
                    listCompleted.append(False)
                else:
                    listCompleted.append(True)

                if values[3] is not None:
                    month = int(values[3][5:7])
                    day = int(values[3][8:])
                    year = int(values[3][:4])
                    extension.append(True)
                    dueDays.append(day)
                    dueMonths.append(month)
                    dueYears.append(year)
                else:
                    extension.append(False)

                if values[4] is not None:
                    secondSpent.append(values[4])

                else:
                    secondSpent.append(0)

            course_id = []
            weightages, taskTypes, taskNames = [], [], []

            counter = 0
            for tsk_id in taskId:
                cursor.execute(
                    f"SELECT taskType, taskDeadline, weightedGrade, courseID, taskName FROM tasks WHERE taskID = {tsk_id}")

                for values in cursor:
                    # print(values[0], values[1], values[2], values[3], values[4])
                    taskTypes.append(values[0])
                    # print(values[1])
                    month = int(values[1][5:7])
                    day = int(values[1][8:])
                    year = int(values[1][:4])

                    if not extension[counter]:
                        dueDays.append(day)
                        dueMonths.append(month)
                        dueYears.append(year)
                    weightages.append(float(values[2]))
                    course_id.append(values[3])
                    taskNames.append(values[4])

                    counter += 1

            # for i in range(len(difficulties)):
            #     print(taskTypes[i], taskNames[i], dueDays[i], "-", dueMonths[i], "-", dueYears[i],
            #           weightages[i], difficulties[i], listCompleted[i])

            register_course_id, subjectImportance_list = [], []

            cursor.execute(f"SELECT courseID, courseImportance FROM usercourses WHERE userID = {self.__user_id}")

            for values in cursor:
                if values[0] in course_id:
                    register_course_id.append(values[0])
                    subjectImportance_list.append(values[1])

            course_id_copy = course_id.copy()

            for i in course_id_copy:
                if i not in register_course_id:
                    course_id.remove(i)

            # subject_task
            subjectID_task = {}

            for i in range(len(course_id)):
                day, month, year = dueDays[i], dueMonths[i], dueYears[i]
                task = term.createTask(taskType=taskTypes[i], difficulty=difficulties[i], day=day, month=month, year=year,
                                       weightage=weightages[i], completed=listCompleted[i], task_name=taskNames[i],
                                       taskID=taskId[i], second=secondSpent[i])

                if course_id[i] not in subjectID_task.keys():
                    val = [task]

                    subjectID_task[course_id[i]] = val

                else:
                    subjectID_task[course_id[i]].append(task)

            subjectNames, subjectClass_numbers = [], []

            for c_id in register_course_id:
                cursor.execute(f"SELECT courseName FROM courses WHERE courseID = {c_id}")

                for values in cursor:
                    name, c_number = "", ""

                    for i in values[0]:
                        if i.isalpha():
                            name += i

                        else:
                            c_number += i

                    subjectNames.append(name)
                    subjectClass_numbers.append(int(c_number))

            subjectID_name = {}

            for i in range(len(register_course_id)):
                c_id = register_course_id[i]

                if c_id not in subjectID_name.keys():
                    names = subjectNames[i]
                    class_numbers = subjectClass_numbers[i]
                    importances = subjectImportance_list[i]

                    subjectID_name[c_id] = names, class_numbers, importances

            subject_tasks = {}

            for key in subjectID_task:
                tasks = term.createTasks(subjectID_task[key])

                name = subjectID_name[key][0]
                numbr = subjectID_name[key][1]
                importance = subjectID_name[key][2]

                subject = term.createSubject(name, numbr, tasks, importance)

                subject_tasks[subject[1]] = tasks

            return subject_tasks

        except:
            lis_tsk = []
            tsk = term.createTask("NoType", 1, 1, 2000, 0, 0, False, 0, 0, False, "Nothing")
            lis_tsk.append(tsk)
            tsks = term.createTasks(lis_tsk)
            sbjct = term.createSubject("NoSubject", 0, tsks, 0)[1]

            sbj_tsk = {sbjct: tsks}

            return sbj_tsk

    def display(self, time_bankList, priority, day_of_the_week):
        try:
            print_counter = 0

            for i in priority:

                time_assigned = format((time_bankList[day_of_the_week] * i[0]), ".2f")

                if i[0] != 0:
                    print("{\"Task\":\"" + i[1].taskType().__str__() + "\", \"TaskID\": " + str(
                        i[1].getTaskID()) + ", \"SecondSpent\": " + str(i[1].getSecondSpent()) + ", \"Class\": \"" + i[
                              1].getClass().__str__() + "\", "
                                                        "\"Difficulty\": " + i[1].difficulty().__str__() \
                          + ", \"Weighted\": " + i[1].weightedGrade().__str__() + ", \"Percentage\": " +
                          format(i[0] * 100, ".2f") + ", \"Time\": " + time_assigned + "}|")

                    print_counter += 1

            if print_counter == 0:
                print("{\"Task\":\"" + "No_Task" + "\", \"TaskID\": " + str(0)
                      + ", \"SecondSpent\": " + str(0) + ", \"Class\": \"" + "No class"
                      + "\", "
                        "\"Difficulty\": " + str(0)
                      + ", \"Weighted\": " + str(0) + ", \"Percentage\": " +
                      str(0) + ", \"Time\": " + str(0) + "}|")

        except:
            print("{\"Task\":\"" + "No_Task" + "\", \"TaskID\": " + str(0)
                  + ", \"SecondSpent\": " + str(0) + ", \"Class\": \"" + "No class"
                  + "\", "
                    "\"Difficulty\": " + str(0)
                  + ", \"Weighted\": " + str(0) + ", \"Percentage\": " +
                  str(0) + ", \"Time\": " + str(0) + "}|")
