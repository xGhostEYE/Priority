const express = require("express");
const router = express.Router();

const tok = require("../../controller/token");
const task = require("../../controller/taskManager");


router.put("/note", tok.verifyToken, (req, res) => {
    task.updateNote(req.user.user.userID, req.body.taskID, req.body.note)
    .then(resolve => {
        res.status(200).json(resolve);
        return;
    })
    .catch(reject => {
        res.status(422).json(reject);
        return;
    })
})

router.get("/note", tok.verifyToken, (req, res) => {
    task.getNote(req.user.user.userID, req.query.taskID)
    .then(resolve => {
        return res.status(200).json(resolve);
    })
    .catch(reject => {
        return res.status(422).json(reject);
    })
})

// date is formatted as yr-month-date
router.put("/finish", tok.verifyToken, (req, res) => {
    if(req.body.finishDate == "" || req.body.finishDate == null){
        res.status(422).json([{msg: "Date cannot be empty!"}]);
        return;
    }
    task.taskFinishStatus(req.user.user.userID, req.body.taskID, req.body.finishDate)
    .then(resolve => {
        return res.status(200).json(resolve);
    })
    .catch(reject => {
        return res.status(422).json(reject);
    })
})

router.put("/incomplete", tok.verifyToken, (req, res) => {
    task.taskFinishStatus(req.user.user.userID, req.body.taskID, null)
    .then(resolve => {
        return res.status(200).json(resolve);
    })
    .catch(reject => {
        return res.status(422).json(reject);
    })
})

router.put("/time", tok.verifyToken, (req, res) => {
    task.updateTimeSpent(req.user.user.userID, req.body.taskID, req.body.secondSpent)
    .then(resolve => {
        return res.status(200).json(resolve);
    })
    .catch(reject => {
        return res.status(422).json(reject);
    })
})

router.put("/difficulty", tok.verifyToken, (req, res) => {
    let difficulty = parseFloat(req.body.difficulty)
    task.updateDiff(req.user.user.userID, req.body.taskID, difficulty)
    .then(resolve => {
        return res.status(200).json(resolve);
    })
    .catch(reject => {
        return res.status(422).json(reject);
    })
})

router.put("/extendDeadline", tok.verifyToken, (req, res) => {
    task.updateDeadline(req.user.user.userID, req.body.taskID, req.body.extendDeadline)
    .then(resolve => {
        return res.status(200).json(resolve);
    })
    .catch(reject => {
        return res.status(422).json(reject);
    })
})

module.exports = router;

