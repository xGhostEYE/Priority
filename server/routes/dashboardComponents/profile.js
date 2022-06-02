const express = require("express");
const router = express.Router();

const tok = require("../../controller/token");
const profile = require("../../controller/profileManager");


router.put("/", tok.verifyToken ,(req, res) =>{
    profile.updateProfile(req.user.user.userID, req.body.email, req.body.name, req.body.studentID, req.body.school, req.body.major)
    .then(resolve => {
        return res.status(200).json(resolve);
    })
    .catch(reject => {
        return res.status(422).json(reject);
    })
})

router.get("/", tok.verifyToken, (req, res) => {
    profile.getProfile(req.user.user.userID)
    .then(resolve => {
        return res.status(200).json(resolve);
    })
    .catch(reject => {
        // console.log(reject)
        return res.status(422).json(reject);
    })
})

router.put("/changePassword", tok.verifyToken, (req, res) => {
    profile.checkExistingPass(req.user.user.userID, req.body.curPass)
    .then(resolve => {
        profile.changePass(req.user.user.userID, req.body.newPass, req.body.confirmNewPass)
        .then(resolve => {
            return res.status(200).json(resolve);
        })
        .catch(reject => {
            return res.status(422).json(reject);
        })
    })
    .catch(reject => {
        return res.status(422).json(reject);
    })
})

module.exports = router;