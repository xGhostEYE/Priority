const db = require("./mysqldb");

async function recordExists(tableName, conditions){
    return new Promise((resolve, reject) => {
        errors = []
        query = `SELECT EXISTS(SELECT * FROM ${tableName} WHERE ${conditions});`
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg: err});
                reject(errors);
                return;
            }
            key = Object.keys(result[0]);
            resolve(result[0][key]);
            return;
        })
    })
}

module.exports = {recordExists}