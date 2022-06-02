const db = require("./mysqldb");
const check = require("./errorCheck");
const bcrypt = require("bcrypt");

async function updateProfile(userID, email, name, studentID, school, major){
    return new Promise((resolve, reject) => {
        if(email == "" || email == null || name == "" || name == null || studentID == "" || studentID == null || school == "" || school == null){
            return reject([{msg: "Fields must not be empty!"}]);   
        }
        errors = [];
        query = `UPDATE user SET email='${email}', name='${name}', studentID='${studentID}', school='${school}', major='${major}' WHERE userID='${userID}'`;
        db.query(query, (err, result) => {
            if(err){
                errors.push(err);
                return reject(errors);
            }
            return resolve("Successfully updated user information");
        })
    })
}

async function getProfile(userID){
    return new Promise((resolve, reject) => {
        check.recordExists("user", `userID='${userID}'`)
        .then(hasUser => {
            if(hasUser === 1){
                errors = [];
                query = `SELECT email, school, name, studentID, major FROM user WHERE userID='${userID}';`;
                db.query(query, (err, result) => {
                    if(err){
                        errors.push(err);
                        return reject(errors);
                    }
                    if(result.length !== 1){
                        errors.push({msg: "Error: Cannot find user"});
                        return reject(errors);
                    }
                    return resolve(result[0]);
                })
            }
        })
        .catch(fail => {
            return reject(fail);
        })
    })
}

async function changePass(userID, newPass, confirmNewPass){
    return new Promise((resolve, reject) => {
        if(newPass != confirmNewPass){
            return reject([{msg: "Your new password and confirmation password doesn't match!"}]);
        }
        check.recordExists("user", `userID='${userID}'`)
        .then(hasUser => {
            if(hasUser === 1){
                var errors = [];
                bcrypt.genSalt(10, (err, salt) => {
                    if(err){
                        errors.push(err);
                        return reject(errors);
                    }
                    bcrypt.hash(newPass, salt, (err, hash) => {
                        if(err){
                            errors.push(err);
                            return reject(errors);
                        }
                        var hashedNewPass = hash;
                        query = `UPDATE user SET password='${hashedNewPass}' WHERE userID='${userID}'`;
                        db.query(query, (err, result) => {
                            if(err){
                                errors.push({msg: err});
                                return reject(errors);
                                
                            }
                            return resolve([{msg: "Password has successfully updated"}]);
                        })
                    })
                })
            }
            else{
                return reject([{msg: "User doesn't exist!"}]);
            }
        })
        .catch(fail => {
            return reject(fail);
        })
    })
}

async function checkExistingPass(userID, curPass){
    return new Promise((resolve, reject) => {
        check.recordExists("user", `userID='${userID}'`)
        .then(hasUser => {
            if(hasUser === 1){
                var errors = [];
                query = `SELECT password FROM user WHERE userID='${userID}'`;
                db.query(query, (err, result) => {
                    if(err){
                        errors.push(err);
                        return reject(errors);
                    }
                    if(result.length === 0){
                        errors.push({msg: "Password not found somehow!!"});
                        return reject(errors);
                    }
                    bcrypt.compare(curPass, result[0].password, (err, isMatch) => {
                        if(err){
                            errors.push({msg: err});
                            return reject(errors);
                        }
                        if(isMatch){
                            return resolve("Password matches");
                        }
                        return reject([{msg: "Your password is incorrect!"}]);
                    })
                })
            }
            else{
                return reject([{msg: "User doesn't exist!"}]);
            }
        })
    })
}

module.exports = {updateProfile, getProfile, changePass, checkExistingPass, checkExistingPass}