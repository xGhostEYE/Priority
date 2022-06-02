const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const session = require("express-session");


const app = express();
const port = 5000;

const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const dashboardRoute = require("./routes/dashboard");
const summaryRoute = require("./routes/dashboardComponents/summary_route");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());
app.use(session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "aaaaaa",
    cookie: {
        maxAge: 7200000, // 2 hours
        sameSite: true,
        httpOnly: true
    }
}))

app.get("/test", (req, res) => {
    res.send("HI THERE");
})

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/dashboard", dashboardRoute);
app.use("/", summaryRoute);


app.listen(port, () => {console.log(`Server on port ${port}`)})