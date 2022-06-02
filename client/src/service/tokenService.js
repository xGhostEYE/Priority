import { createContext } from "react";
import UserContext from "../context/user";


function testToken(token) {
    var status;
    var result;
    return fetch("/login/test", {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        status = res.status
        return res.json();
    })
    .then(data => {
        // INVALID TOKEN
        if (status !== 200) {
            result = false;
        }
        else{
            result = true;
        }
        console.log(result);
        return result;
        /////// TEST TOKEN ////////////
    })
    .catch(error => console.warn(error));
}

function logout(){
    localStorage.setItem("token", null);
    console.log("delete token");
    console.log(localStorage.getItem("token"));
    window.location = "/login";
}

export {testToken, logout};