from Algorithm.Subjects import Subject, Major, SubjectInstance
from Algorithm.Subject_Properties import Tasks, ClassImportance, Task
from Algorithm.Task_Properties import Deadline, Difficulty, Type, WeightedGrade, Completed
from Algorithm import MaxPriorityQueue
from Algorithm import Priority
import datetime as dt


# This creates the the term and has all the subjects and the task in it
class Term(object):

    @staticmethod
    def createSubject(name: str, class_number: int, tasks: Tasks.Tasks, classImportance: int, major=False) -> \
            (Subject.Subject, SubjectInstance.SubjectInstance):
        subject: Subject.Subject

        subject = Subject.Subject(name)

        class_importance = ClassImportance.ClassImportance(classImportance)
        subjectInstance = SubjectInstance.SubjectInstance(subject, class_number, tasks, class_importance)

        return subject, subjectInstance

    @staticmethod
    def createTask(taskType: str, day: int, month: int, year: int,
                   difficulty: int, weightage: float, completed: bool, taskID: int, second: int, deadline_known=True,
                   task_name=" ") -> Task.Task:
        task_deadline = Deadline.Deadline(deadline_known, day, month, year)
        task_difficulty = Difficulty.Difficulty(difficulty)
        task_type = Type.Type(taskType, task_name)
        task_weightage = WeightedGrade.WeightedGrade(weightage)
        task_completed = Completed.Completed(completed)

        return Task.Task(task_type, task_deadline, task_difficulty, task_weightage, task_completed, taskID=taskID,
                         secondSpent=second)

    @staticmethod
    def createTasks(*task) -> Tasks.Tasks:
        return Tasks.Tasks(*task)

    @staticmethod
    def assignPriorityToTasks(subjectTasks: dict, date: dt) -> dict:
        priority = Priority.Priority(subjectTasks)
        return priority.assign_priority(date)

    @staticmethod
    def displayPriority(taskPriorityDict: dict) -> list:
        queue = MaxPriorityQueue.MaxPriorityQueue(taskPriorityDict)
        return queue.createPriorityQueue()
