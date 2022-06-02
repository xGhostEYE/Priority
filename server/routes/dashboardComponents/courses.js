const express = require("express");
const router = express.Router();

const tok = require("../../controller/token");
const course = require("../../controller/courseManager");

const task = require("./task");

router.get("/test", tok.verifyToken, (req, res) => {
    var tasks;
    course.taskOfCourse(req.query.courseID)
    .then(dbtasks => {
        tasks = dbtasks
        // console.log(tasks);
        return res.json(tasks);
    })
    .then(() => {
        console.log("HELLO");
        // console.log(tasks);
    })
})

// get a user's courses
router.get("/", tok.verifyToken, (req, res) => {
    course.getCourses(req.user.user.userID)
    .then(resolve => {
        res.json(resolve);
        return;
    })
    .catch(reject =>{
        res.json(reject);
        return;
    })
})

router.get("/course/tasks", tok.verifyToken, (req, res) => {
    course.getTasksByCourse(req.user.user.userID, req.query.courseID)
    .then(resolve =>{
        // console.log(resolve);
        res.status(200).json(resolve);
        return;
    })
    .catch(reject =>{
        res.status(422).json(reject);
        return;
    })
})

router.get("/course/getImportance", tok.verifyToken, (req, res) => {
    course.getImportance(req.user.user.userID, req.query.courseID)
    .then(resolve => {
        res.status(200).json(resolve);
        return;
    })
    .catch(reject => {
        res.status(422).json(reject);
        return;
    })
})

router.put("/course/setImportance", tok.verifyToken, (req, res) => {
    course.setImportance(req.user.user.userID, req.body.courseID, req.body.importance)
    .then(resolve => {
        res.status(200).json(resolve);
        return;
    })
    .catch(reject => {
        res.status(422).json(reject);
        return;
    })
})

router.post("/addCourse", tok.verifyToken, (req, res) => {
    course.addCourse(req.user.user.userID, req.body.courseID, req.body.importance)
    .then(resolve =>{
        // get tasksOfCourse
        course.taskOfCourse(req.body.courseID)
        .then(tasks => {
            let taskLogic = require("../../controller/taskManager");
            taskLogic.addTasksToUser(tasks, req.user.user.userID);
            return res.status(200).json(resolve);
        })
    })
    .catch(reject => {
        return res.status(422).json(reject);
    })
    
})

router.post("/dropCourse", tok.verifyToken, (req, res) => {
    course.deleteCourse(req.user.user.userID, req.body.courseID)
    .then(resolve => {
        course.taskOfCourse(req.body.courseID)
        .then(tasks => {
            let taskLogic = require("../../controller/taskManager");
            taskLogic.deleteTasksFromUser(tasks, req.user.user.userID);
            return res.status(200).json(resolve);
        })
    })
    .catch(reject =>{
        return res.status(422).json(reject);
    })
})

router.get("/allCourses", tok.verifyToken, (req, res) => {
    course.getAvailCourses(req.user.user.userID)
    .then(resolve => {
        return res.status(200).json(resolve);
    })
    .catch(reject => {
        return res.status(422).json(reject);
    })
})

router.use("/course/task", task);

module.exports = router;

