const express = require("express");
const router = express.Router();

const tok = require("../../controller/token");
const summary = require("../../controller/summary");


router.get("/todaySummary", tok.verifyToken, (req, res) => {
    summary.getTodaySummary(req.user.user.userID)
    .then(resolve => {
        return res.status(200).json(resolve);
    })
    .catch(reject => {
        return res.status(422).json(reject);
    })
})

router.get("/weekSummary", tok.verifyToken, (req, res) => {
    summary.getWeeklySummary(req.user.user.userID)
    .then(resolve => {
        return res.status(200).json(resolve);
    })
    .catch(reject => {
        return res.status(422).json(reject);
    })
})

module.exports = router;
