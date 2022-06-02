const express = require("express");

const router = express.Router();

const timebank = require("./dashboardComponents/timebank");
const course = require("./dashboardComponents/courses");
const profile = require("./dashboardComponents/profile");

const tok = require("../controller/token");


router.get("/test", tok.verifyToken, (req, res) => {
    var today = new Date();
    task.finishTask(5, 14, today.toLocaleDateString())
    .then(resolve => {
        return res.json(resolve);
    })
    .catch(reject => {
        return res.json(reject);
    })
})

router.get("/user", tok.verifyToken, (req, res) => {
    res.json(req.user.user);
    return;
})

router.use("/timebank", timebank);

router.use("/courses", course);

router.use("/profile", profile);






module.exports = router;