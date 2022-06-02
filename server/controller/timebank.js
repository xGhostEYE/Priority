const db = require("./mysqldb");

async function getTimebank(userID){
    return new Promise((reject, resolve) => {
        errors = [];
        query = `SELECT * FROM usertimebank WHERE userID=${userID}`;
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg: err})
                console.log(err)
                // reject(errors);
                // return;
            }
            if(result.length === 0){
                errors.push({msg: "User doesn't exist"});
                // reject(errors)
                // return;
            }
            if(errors.length > 0){
                reject(errors);
            }
            resolve(result[0]);
            return;
        })
    })
}

async function changeTimeBank(userID, newTimes){
    return new Promise((resolve, reject) => {
        errors = [];
        query = `UPDATE usertimebank 
        SET mon='${newTimes.mon}', tues='${newTimes.tues}', weds='${newTimes.weds}', thurs='${newTimes.thurs}', fri='${newTimes.fri}', sat='${newTimes.sat}', sun='${newTimes.sun}'
        WHERE userID='${userID}'`
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg: err});
                // console.log(err);
            }
            if(result.length === 0){
                // console.log(err)
                errors.push({msg: "User doesn't exist"});
            }
            if(errors.length > 0){
                return reject(errors);
            }
            return resolve("Timebank update successful");
        })
    })
}

module.exports = {getTimebank, changeTimeBank};