const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    // console.log("Verifying token");
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if(authHeader){
        const token = authHeader.split(" ")[1];
        // console.log("token", token);
        jwt.verify(token, "superSecretKey", (err, user) => {
            if(err){
                res.status(403).json({msg: "Token not valid!"});
                return;
            }

            req.user = user;
            next();

        })
    }
    else{
        // console.log("Not authenticated");
        res.status(401).json({msg: "You are not authenticated!"});
    }
}

module.exports = {verifyToken};