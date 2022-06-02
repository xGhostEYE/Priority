const db = require("./mysqldb");
const check = require("./errorCheck");


async function getTasks(userID){
    return new Promise((resolve, reject) => {
        errors = [];
        query = `SELECT * FROM usertask WHERE userID='${userID} AND finishedDate IS null'`;
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg: err});
                return reject(errors);
            }
            // if(result.length === 0){
            //     return reject({msg: "User has no tasks to do"});
            // }
            return resolve(result);
        })
    })
}

async function updateNote(userID, taskID, userNote){
    return new Promise((resolve, reject) => {
        if(taskID == null || taskID == ""){
            return reject([{msg: "taskID cannot be null/empty!"}]);
        }
        check.recordExists("usertask", `userID=${userID} AND taskID=${taskID}`)
        .then(hasTask => {
            if(hasTask === 1){
                errors = [];
                userNote = userNote.replace("'", "\\'");
                query = `UPDATE usertask SET note='${userNote}' WHERE userID='${userID}' AND taskID='${taskID}'`;
                db.query(query, (err, result) => {
                    if(err){
                        errors.push({msg: err});
                        return reject(errors);
                        
                    }
                    return resolve("Successfully updated note");
                })
            }
            else{
                return reject([{msg: "This task isn't part of the user's to do!"}]);
                
            }
        })
        .catch(fail => {
            return reject(fail);
        })
    })
}

async function getNote(userID, taskID){
    return new Promise((resolve, reject) => {
        if(taskID == null || taskID == ""){
            return reject([{msg: "taskID cannot be null!"}]);
        }
        check.recordExists("usertask", `userID='${userID}' AND taskID='${taskID}'`)
        .then(hasTask => {
            if(hasTask === 1){
                errors = [];
                query = `SELECT note FROM usertask WHERE userID='${userID}' AND taskID='${taskID}'`;
                db.query(query, (err, result) => {
                    if(err){
                        errors.push({msg: err});
                        return reject(errors);
                    }
                    return resolve(result[0]);
                })
            }
            else{
                errors.push({msg: "This task doesn't exist!"});
                return reject(errors);
            }
        })
        .catch(fail => {
            return reject(fail);
        })
    })
}

async function taskFinishStatus(userID, taskID, finishDate){
    return new Promise((resolve, reject) => {
        if(taskID == null || taskID == ""){
            return reject([{msg: "taskID cannot be null!"}]);
        }
        check.recordExists("usertask", `userID='${userID}' AND taskID='${taskID}'`)
        .then(hasTask => {
            if(hasTask === 1){
                errors = [];
                if(finishDate == null){
                    query = `UPDATE usertask SET finishedDate=null WHERE userID='${userID}' AND taskID='${taskID}'`;
                }
                else{
                    query = `UPDATE usertask SET finishedDate='${finishDate}' WHERE userID='${userID}' AND taskID='${taskID}'`;
                }
                db.query(query, (err, result) => {
                    if(err){
                        errors.push({msg: err});
                        return reject(errors);
                    }
                    return resolve("Finished Date successfully updated");
                })
            }
            else{
                errors.push({msg: "This task doesn't exist!"});
                return reject(errors);
            }
        })
        .catch(fail => {
            return reject(fail);
        })
    })
}

async function updateTimeSpent(userID, taskID, secondSpent){
    return new Promise((resolve, reject) => {
        if(taskID == null || taskID == ""){
            return reject([{msg: "taskID cannot be null!"}]);
        }
        if(secondSpent == null || secondSpent == ""){
            return reject([{msg: "secondSpent cannot be empty!"}]);
        }
        check.recordExists("usertask", `userID='${userID}' AND taskID='${taskID}'`)
        .then(hasTask => {
            if(hasTask === 1){
                errors = [];
                query = `UPDATE usertask SET secondSpent='${secondSpent}' WHERE userID='${userID}' AND taskID='${taskID}'`;
                db.query(query, (err, result) => {
                    if(err){
                        errors.push({msg: err});
                        return reject(errors);
                    }
                    return resolve("Time spent on task updated successfully");
                })
            }
            else{
                errors.push({msg: "This task doesn't exist!"});
                return reject(errors);
            }
        })
        .catch(fail => {
            return reject(fail);
        })
    })
}

async function updateDiff(userID, taskID, diff){
    return new Promise((resolve, reject) => {
        if(taskID == null || taskID == ""){
            return reject([{msg: "taskID cannot be null!"}]);
        }
        if(diff == null || typeof(diff) !== "number" || Number.isNaN(diff)){
            return reject([{msg: "difficulty is not a number!"}]);
        }
        check.recordExists("usertask", `userID='${userID}' AND taskID='${taskID}'`)
        .then(hasTask => {
            if(hasTask === 1){
                errors = [];
                query = `UPDATE usertask SET difficulty='${diff}' WHERE userID='${userID}' AND taskID='${taskID}';`;
                db.query(query, (err, result) => {
                    if(err){
                        errors.push({msg:err});
                        return reject(errors);
                    }
                    return resolve(`Difficulty of task ${taskID} is updated to ${diff}`);
                })
            }
            else{
                errors.push({msg: "This task doesn't exist!"});
                return reject(errors);
            }
        })
        .catch(fail => {
            return reject(fail);
        })
    })
}

async function updateDeadline(userID, taskID, deadline){
    return new Promise((resolve, reject) => {
        if(taskID == null || taskID == ""){
            return reject([{msg: "taskID cannot be null!"}]);
        }
        if(deadline == null || deadline == ""){
            return reject([{msg: "deadline cannot be empty or null!"}]);
        }
        check.recordExists("usertask", `userID='${userID}' AND taskID='${taskID}'`)
        .then(hasTask => {
            if(hasTask === 1){
                errors = [];
                query = `UPDATE usertask SET extendDeadline='${deadline}' WHERE userID='${userID}' AND taskID='${taskID}';`;
                db.query(query, (err, result) => {
                    if(err){
                        errors.push({msg:err});
                        return reject(errors);
                    }
                    return resolve(`Deadline of task ${taskID} is updated to ${deadline}`);
                })
            }
            else{
                errors.push({msg: "This task doesn't exist!"});
                return reject(errors);
            }
        })
        .catch(fail => {
            return reject(fail);
        })
    })
}

function addTasksToUser(tasks, userID){
    if(tasks.length === 0){
        return;
    }
    strBuilder = ""
    for(i = 0; i < tasks.length; i += 1){
        if(i != tasks.length-1){
            temp = `(${tasks[i].taskID}, ${userID}, 5), `;
            strBuilder += temp;
        }
        else{
            temp = `(${tasks[i].taskID}, ${userID}, 5)`;
            strBuilder += temp;
        }
    }
    query = `INSERT INTO usertask (taskID, userID, difficulty) VALUES ${strBuilder}`
    db.query(query, (err, result) => {
        if(err){
            throw err
        }
    })
}

function deleteTasksFromUser(tasks, userID){
    if(tasks.length === 0){
        return;
    }
    strBuilder = "("
    for(i = 0; i < tasks.length; i += 1){
        if(i != tasks.length-1){
            strBuilder += `${tasks[i].taskID}, `;
        }
        else{
            strBuilder += `${tasks[i].taskID})`;
        }
    }
    query = `DELETE FROM usertask WHERE userID='${userID}' AND taskID IN ${strBuilder}`;
    db.query(query, (err, result) => {
        if(err){
            throw err
        }
    })
}
module.exports = {getTasks, updateNote, getNote, taskFinishStatus, updateTimeSpent, updateDiff, updateDeadline, addTasksToUser, deleteTasksFromUser}