import {logout} from './tokenService';

function updateSecondSpent (token, taskID, secondSpent) {
    var status;
    var result;
    return fetch("/dashboard/courses/course/task/time", {
        headers: {
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: "PUT",
        body: JSON.stringify({taskID: taskID, secondSpent: secondSpent})
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

export {updateSecondSpent};