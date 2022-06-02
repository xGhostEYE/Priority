from Algorithm.Subject_Properties import Task as Tk
from Algorithm.Subjects import SubjectInstance as Si
import datetime as dt


# this class handles the priority of the task and assigns priority to the task
class Priority(object):

    def __init__(self, subject_tasks: dict):
        self.__subject_tasks = subject_tasks

    @staticmethod
    def __calculate_priority(task: Tk.Task, subject: Si.SubjectInstance, date) -> float:

        """Note: There is a flaw in the formula, task with a bigger due date will
        get more priority than one with smaller"""

        difficulty = task.difficulty().getDifficulty()
        n_grade = task.weightedGrade().getWeightage()
        class_importance = subject.getClassImportance().getValue()
        due_date = task.deadline().dayLeft(today=date)
        completed = task.completed().isCompleted()

        if due_date == -1 or due_date > 14 or completed or not task.deadline().isDeadlineKnown():
            return 0

        formula = difficulty/5 * 0.2 + n_grade/100 * 0.2 + class_importance/5 * 0.3 + (1 - due_date/14) * 0.3

        return formula

    def assign_priority(self, date: dt) -> dict:

        task_score = {}

        total_score = 0

        for subject, tasks in self.__subject_tasks.items():
            for task in tasks.getTasks():
                task.setClass(subject)
                score = self.__calculate_priority(task, subject, date)
                task_score[task] = score
                total_score += score

        task_priority = {}

        for task, score in task_score.items():
            if total_score != 0:
                priority = score / total_score

                task_priority[task] = priority
            else:
                task_priority[task] = 0

        return task_priority
