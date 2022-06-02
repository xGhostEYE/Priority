import {logout} from './tokenService';

function getProfile (token) {
    var status;
    return fetch("/dashboard/profile", {
        headers: {
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
        status = res.status
        return res.json();
    })
    .then(data => {
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

function updateProfile (token, newProfile) {
    var status;
    return fetch("/dashboard/profile", {
        headers: {
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method:"PUT",
        body: JSON.stringify(newProfile),
    })
    .then(res => {
        status = res.status
        return res.json();
    })
    .then(data => {
        if (status !== 200) {
            if (status === 403){
                logout();
            }
            console.log(data[0].msg);
            return {result: false, msg: data[0].msg}
        }
        else{
            return {result: true, msg: data}
        }
    })
    .catch(error => console.warn(error));
}

function updatePass (token, newPass) {
    var status;
    console.log(newPass);
    return fetch("/dashboard/profile/changePassword", {
        headers: {
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method:"PUT",
        body: JSON.stringify(newPass),
    })
    .then(res => {
        status = res.status
        return res.json();
    })
    .then(data => {
        if (status !== 200) {
            if (status === 403){
                logout();
            }
            console.log(data[0].msg);
            return {result: false, msg: data[0].msg}
        }
        else{
            return {result: true, msg: data[0].msg}
        }
    })
    .catch(error => console.warn(error));
}

export {getProfile, updateProfile, updatePass};