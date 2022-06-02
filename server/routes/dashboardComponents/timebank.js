const express = require("express");
const router = express.Router();

const tok = require("../../controller/token");
const timebank = require("../../controller/timebank");

router.get("/", tok.verifyToken, (req, res) => {
    var userID = req.user.user.userID;
    timebank.getTimebank(userID)
    .then(resolve => {
        //console.log(resolve)
        res.json(resolve);
        return;
    })
    .catch(reject => {
        // console.log(reject)
        res.json(reject);
        return;
    });
})

router.put("/update", tok.verifyToken, (req, res) => {
    // console.log(req.user.user.userID, req.body);
    timebank.changeTimeBank(req.user.user.userID, req.body)
    .then(resolve => {
        res.status(200).json(resolve);
        return;
    })
    .catch(reject => {
        res.status(422).json(reject);
        return;
    })
})

module.exports = router;