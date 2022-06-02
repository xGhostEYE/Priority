const db = require("./mysqldb");
const check = require("./errorCheck");

async function getTasksByCourse(userID, courseID){
    return new Promise((resolve, reject) => {
        if(courseID == null || courseID == ""){
            return reject([{msg: "courseID cannot be null or empty!"}]);
        }
        errors = [];
        query = `SELECT usertask.taskID, tasks.taskName, usertask.difficulty, tasks.weightedGrade, tasks.taskDeadline, usertask.extendDeadline, usertask.note FROM tasks 
        JOIN usertask 
        ON usertask.taskID = tasks.taskID 
        WHERE usertask.userID='${userID}' AND tasks.courseID='${courseID}';`;
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg: err});
                return reject(errors);
            }
            // if(result.length === 0){
            //     return reject({msg: "User has no tasks for this course"});
            // }
            return resolve(result);
        })
    })
}

async function getAvailCourses(userID){
    return new Promise((resolve, reject) => {
        errors = [];
        // query = `SELECT * FROM courses WHERE courseID NOT IN
        // (SELECT courseID FROM usercourses WHERE userID='${userID}')`;
        query = `SELECT * FROM courses;`;
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg:err});
                return reject(errors);
            }
            return resolve(result);
        })
    })
}

async function getCourses(userID){
    return new Promise((resolve, reject) => {
        errors = [];
        query = `SELECT courses.courseID, courses.courseName, usercourses.courseImportance FROM courses
        JOIN usercourses
        ON usercourses.courseID = courses.courseID
        WHERE usercourses.userID = '${userID}';`;
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg: err});
                return reject(errors);
            }
            if(result.length === 0){
                return reject([{msg: "User has no courses"}]);
            }
            return resolve(result);
        })
    })
}

async function taskOfCourse(courseID){
    return new Promise((resolve, reject) => {
        query = `SELECT * FROM tasks WHERE courseID=${courseID}`;
        db.query(query, (err, result) => {
            if(err){
                return reject([{msg: err}]);
            }
            return resolve(result);
        })
    })
}


async function addCourse(userID, courseID, importance){
    return new Promise((resolve, reject) => {
        if(courseID == null || courseID == ""){
            return reject({msg: "courseID cannot be null or empty!"});
        }
        check.recordExists("courses", `courseID='${courseID}'`).
        then(courseExists => {
            if(courseExists === 1){
                check.recordExists("usercourses", `userID='${userID}' AND courseID='${courseID}'`)
                .then(hasCourse => {
                    if(hasCourse === 1){
                        return reject({msg: "User already in this course"});
                    }
                    else{
                        errors = [];
                        query = `INSERT INTO usercourses (userID, courseID, courseImportance) VALUES ('${userID}', '${courseID}', '${importance}')`;
                        db.query(query, (err, result) => {
                            if(err){
                                errors.push({msg: err});
                                return reject(errors);
                            }
                            return resolve("Successfully added course");
                        })
                    }
                })
                .catch(fail => {
                    return reject(fail);
                })
            }
            else{
                return reject({msg: "Course doesn't exist"});
            }
        })
        .catch(fail => {
            return reject(fail);
        })
    })
}

async function deleteCourse(userID, courseID){
    return new Promise((resolve, reject) => {
        if(courseID == null || courseID == ""){
            return reject([{msg: "courseID cannot be null or empty!"}]);
        }
        check.recordExists("usercourses", `userID='${userID}' AND courseID=${courseID}`)
        .then(hasCourse => {
            if(hasCourse === 1){
                query = `DELETE FROM usercourses WHERE userID='${userID}' AND courseID='${courseID}'`;
                db.query(query, (err, result) => {
                    if(err){
                        return reject([{msg: err}]);
                    }
                    return resolve("Successfully dropped course");
                })
            }
            else{
                return reject({msg: "User not enrolled in this course!"});
            }
        })
        .catch(fail => {
            return retject(fail);
        })
        
    })
}

async function setImportance(userID, courseID, importance){
    return new Promise((resolve, reject) => {
        if(courseID == null || courseID == ""){
            return reject([{msg: "courseID cannot be null or empty!"}]);
        }
        check.recordExists("usercourses", `userID='${userID}' AND courseID='${courseID}'`)
        .then(hasTask => {
            if(hasTask === 1){
                errors = [];
                query = `UPDATE usercourses 
                SET courseImportance='${importance}' WHERE userID='${userID}' AND courseID='${courseID}'`;
                db.query(query, (err, result) => {
                    if(err){
                        errors.push({msg: err});
                        return reject(errors);
                    }
                    return resolve("Successfully changed importance");
                })
            }
            else{
                return reject({msg: "User is not enrolled in this course!"});
            }
        })
        .catch(fail => {
            return reject(fail);
        })
    })
}

async function getImportance(userID, courseID){
    return new Promise((resolve, reject) => {
        if(courseID == null || courseID == ""){
            return reject([{msg: "courseID cannot be null or empty!"}]);
        }
        check.recordExists("usercourses", `userID='${userID}' AND courseID='${courseID}'`)
        .then(hasTask => {
            if(hasTask === 1){
                errors = [];
                query = `SELECT courseImportance FROM usercourses WHERE userID='${userID}' AND courseID='${courseID}'`;
                db.query(query, (err, result) => {
                    if(err){
                        errors.push({msg: err});
                        return reject(errors);
                    }
                    return resolve(result[0]);
                })
            }
            else{
                return reject({msg: "User is not enrolled in this course!"});
            }
        })
        .catch(fail => {
            return reject(fail);
        })
    })
}


module.exports = {getCourses, addCourse, setImportance, getImportance, getAvailCourses, getTasksByCourse, taskOfCourse, deleteCourse}