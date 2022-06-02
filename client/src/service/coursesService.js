import {logout} from './tokenService';

function getAllCourse(token){
    var status;
    return fetch("/dashboard/courses", {
        headers:{
            "authorization": `Bearer ${token}`
        }
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
            return data;
        }
    })
    .catch(error => console.warn(error));
}

function getAllTasks(token, courseID){
    var status;
    return fetch("/dashboard/courses/course/tasks?"+ new URLSearchParams({
        courseID: courseID,
    }),
     {
        headers:{
            "authorization": `Bearer ${token}`
        }
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
            console.log(data.msg);
        }
        else{
            return data;
        }
    })
    .catch(error => console.warn(error));
}

async function getDataCoursesTab(token){
    let courses = await getAllCourse(token);
    var coursesData = [];
    for (const item of courses){
        let data = await getAllTasks(token, item.courseID);
        coursesData.push(data);
    }
    return {courses: courses, coursesData: coursesData};
}

function updateNote(token, thisTaskID, thisNote){
    var status;
    return fetch("/dashboard/courses/course/task/note", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({taskID: thisTaskID, note: thisNote}),
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
            return {result: false, msg: data[0].msg}
        }
        else{
            return {result: true, msg: data}
        }
    })
    .catch(error => console.warn(error));
}

function updateExtendDeadline (token, taskID, newDeadline){
    var status;
    return fetch("/dashboard/courses/course/task/extendDeadline", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({taskID: taskID, extendDeadline: newDeadline}),
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
            return {result: false, msg: data[0].msg}
        }
        else{
            return {result: true, msg: data}
        }
    })
    .catch(error => console.warn(error));
}

function updateDifficulty (token, taskID, difficulty){
    var status;
    return fetch("/dashboard/courses/course/task/difficulty", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({taskID: taskID, difficulty: difficulty}),
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
            return {result: false, msg: data[0].msg}
        }
        else{
            return {result: true, msg: data}
        }
    })
    .catch(error => console.warn(error));
}


function markTaskCompleted (token, thisTaskID){
    var status;
    const today = new Date().toISOString().slice(0, 10);
    return fetch("/dashboard/courses/course/task/finish", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({taskID: thisTaskID, finishDate: today}),
    })
    .then( res => {
        status = res.status;
        return res.json();
    })
    .then( data => {
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

function markTaskIncompleted (token, thisTaskID){
    var status;
    return fetch("/dashboard/courses/course/task/incomplete", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({taskID: thisTaskID}),
    })
    .then( res => {
        status = res.status;
        return res.json();
    })
    .then( data => {
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

async function getAllDataBaseCourses(token) {
    var status;
    return fetch("/dashboard/courses/allCourses", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'GET',
    })
    .then( res => {
        status = res.status;
        return res.json();
    })
    .then( data => {
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

function addNewCourse(token,ID, Priority) {
    var status;
    return fetch("/dashboard/courses/addCourse", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify( {courseID: ID, importance: Priority})
    })
    .then( res => {
        status = res.status;
        return res.json();
    })
    .then( data => {
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

function setImportance(token,ID,Priority){

    var status;
    return fetch("/dashboard/courses/course/setImportance", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({courseID: ID, importance: Priority })
    })
    .then( res => {
        status = res.status;
        return res.json();
    })
    .then( data => {
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

function deleteCourse(token,ID){
    var status;
    return fetch("/dashboard/courses/dropCourse", {
        headers:{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({courseID: ID})
    })
    .then( res => {
        status = res.status;
        return res.json();
    })
    .then( data => {
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

    
export {getDataCoursesTab, getAllTasks,
     updateNote,updateDifficulty, updateExtendDeadline,
     markTaskCompleted, markTaskIncompleted, getAllDataBaseCourses,getAllCourse, setImportance, deleteCourse, addNewCourse};