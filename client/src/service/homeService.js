import {logout} from "./tokenService";

async function getTodayDataHomeTab(token){
    var status;
    return fetch("/todaySummary", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'GET',
    })
    .then( res =>{
        status = res.status;
        return res.json();
    })
    .then( data =>{
        console.log(data);
        if (status !== 200) {
            if (status === 403){
                logout();
            }
            console.log(data[0].msg);
        }
        else{
            return data;
        }
    })
    .catch(error => console.warn(error));
}

function getWeekDataHomeTab(token){
    var status;
    return fetch("/weekSummary", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'GET',
    })
    .then( res =>{
        status = res.status;
        return res.json();
    })
    .then( data =>{
        console.log(data);
        if (status !== 200) {
            if (status === 403){
                logout();
            }
            console.log(data[0].msg);
        }
        else{
            return data;
        }
    })
    .catch(error => console.warn(error));
}

function updateTimeBank(token, input){
    var status;
    return fetch("/dashboard/timeBank/update", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(input),
    })
    .then( res =>{
        status = res.status;
        return res.json();
    })
    .then( data =>{
        console.log(data);
        if (status !== 200) {
            if (status === 403){
                logout();
            }
            console.log(data[0].msg);
        }
        else{
            return data;
        }
    })
    .catch(error => console.warn(error));
}

function getTimeBank (token){
    var status;
    return fetch("/dashboard/timeBank", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    .then( res =>{
        status = res.status;
        return res.json();
    })
    .then( data =>{
        if (status !== 200) {
            if (status === 403){
                logout();
            }
            console.log(data[0].msg);
        }
        else{
            delete data.userID;
            return data;
        }
    })
    .catch(error => console.warn(error));
}


export {getTodayDataHomeTab,getWeekDataHomeTab,
     updateTimeBank, getTimeBank};