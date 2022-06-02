const express = require('express');
const {spawn} = require('child_process');

async function getTodaySummary(userID) {
    return new Promise((resolve, reject) => {

        let dataToSend;

        const python = spawn('python3', ['controller/todaySummary.py', userID]);

        python.stdout.on('data', function (data) {
            dataToSend = data.toString();
            // console.log(dataToSend);
        })

        python.stderr.on('data', (data) => {
            console.log(data.toString())
        })

        python.on('close', (code) => {
            let arr = dataToSend.split("|");
            try {
                let list_of_objs = [];

                for(let i = 0; i < arr.length-1; i++){

                    let obj = JSON.parse(arr[i]);
                    list_of_objs.push(obj);

                }

                resolve(list_of_objs);
            }

            catch(err){
                console.log(err);
                resolve(err);
            }
        })
    })
}

async function getWeeklySummary(userID) {
    return new Promise((resolve) => {

        let dataToSend;

        const python = spawn('python3', ['controller/weeklySummary.py', userID]);

        python.stdout.on('data', function (data) {
            dataToSend = data.toString();
        })

        python.stderr.on('data', (data) => {
            console.log(data.toString())
        })

        python.on('close', (code) => {
            let arr = dataToSend.split("?");

            let obj = {"Monday": [], "Tuesday": [], "Wednesday": [],
            "Thursday": [], "Friday": [], "Saturday": []};


            try {

                for(let week= 0; week<7; week++) {

                    let list_of_objs = [];

                    let check = arr[week].split(">")[1].split("|");

                    for (let i = 0; i < check.length - 1; i++) {

                        let obj = JSON.parse(check[i]);
                        list_of_objs.push(obj);

                    }

                    if (week===0){
                        obj.Monday = list_of_objs;
                    }

                    else if(week === 1){
                        obj.Tuesday = list_of_objs
                    }

                    else if(week === 2){
                        obj.Wednesday = list_of_objs
                    }
                    else if(week === 3){
                        obj.Thursday = list_of_objs
                    }
                    else if(week === 4){
                        obj.Friday = list_of_objs
                    }

                    else{
                        obj.Saturday = list_of_objs
                    }

                }

                // obj = JSON.parse(arr[0]);
                resolve(obj);

            } catch (err) {
                console.log(err);
                resolve(err);
            }
        })

    })
}

module.exports = {getWeeklySummary, getTodaySummary};

