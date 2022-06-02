import { Component, useEffect, useState, useContext } from "react";
import ReactApexChart from 'react-apexcharts';
import Dropdown from './dropdown.js';
import UserContext from "../context/user"
import { getTodayDataHomeTab, getWeekDataHomeTab, getTimeBank, updateTimeBank } from "../service/homeService"
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Alert from '@mui/material/Alert';

const optPie = {
    labels: [],
    chart: {
        align: 'center',
        offsetX: 50,
        width: 380,
        type: 'donut',
    },
    dataLabels: {
        enabled: true
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                show: true
            }
        }
    }],
    legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
    },
    title: {
        text: "Today's Summary",
        align: 'center',
        margin: 10,
        offsetX: -50,
        offsetY: 0,
        floating: false,
        style: {
            fontSize: '30px',
            fontWeight: 'bold',
            fontFamily: "ariel",
            color: '#263238'
        },
    }
};
const optBar = {
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '75%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    yaxis: {
        title: {
            text: '(Hours)'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + " Hrs"
            }
        }
    }
}

export default function Home() {
    const token = useContext(UserContext);
    const [seriesPie, setSeriesPie] = useState(null);
    const [optionsPie, setOptionPie] = useState(optPie);
    const [seriesBar, setSeriesBar] = useState([{
        name: 'None',
        data: [0, 0, 0, 0, 0, 0]
    }]);
    const [optionsBar, setOptionBar] = useState(optBar);
    const [timeBank, setTimeBank] = useState(null);

    const handleNewDate_and_hours = (NewDate, NewHours) => {
        //loop through each task  [0,0,...] and the postion of each data will correspond with the day. 
        //then add all the values for the day together
        //then pass those values 
        const newdict = timeBank;
        newdict[NewDate] = NewHours;
        setTimeBank(newdict);
        updateTimeBank(token, newdict).then (data => console.log(data));
        updateChart();
    }

    function indexTranslate(index) {
        if (index === 0) {
            return "mon"
        }
        if (index === 1) {
            return "tues"
        }
        if (index === 2) {
            return "weds"
        }
        if (index === 3) {
            return "thurs"
        }
        if (index === 4) {
            return "fri"
        }
        if (index === 5) {
            return "sat"
        }
    }

    function appendWeekData(data) {
        var arr_series = []
        var arr_taskID = []

        console.log(data);
        Object.keys(data).forEach( (key, index) => {
            let tasks = data[key];
            tasks.forEach( (item, i) => {
                //if taskID is not recognized yet
                let taskID = item.TaskID;
                if ( !arr_taskID.includes(taskID)){
                        let series_data = { name: "None", data: [0, 0, 0, 0, 0, 0] };
                        arr_taskID.push(taskID);
                        series_data.name = item.Class.concat(": ", item.Task);
                        series_data.data[index] = item.Time;
                        arr_series.push(series_data);
                }
                // if taskID is already in list
                else{
                    let index_arr_series = arr_taskID.indexOf(taskID);
                    let series_data = arr_series[index_arr_series];
                    series_data.data[index] = item.Time;
                }
            });
        });
        console.log(arr_series);
        setSeriesBar(arr_series);
    }

    function translate(date) {
        if (date === "Mon" || date === "Monday") {
            return 0
        }
        if (date === "Tue" || date === "Tuesday") {
            return 1
        }
        if (date === "Wed" || date === " Wednesday") {
            return 2
        }
        if (date === "Thu" || date === "Thursday") {
            return 3
        }
        if (date === "Fri" || date === "Friday") {
            return 4
        }
        if (date === "Sat" || date === "Saturday") {
            return 5
        }
    }

    function appendTodayData(data) {
        const arr_series = [];
        const arr_labels = [];
        const options_dup = optionsPie;
        options_dup["labels"] = [];

        data.map((item) => {
            const percent = item.Percentage;
            const task = item.Task;
            const className = item.Class;
            arr_series.push(percent);
            options_dup["labels"].push(task);
            arr_labels.push(className);
        })
        // Correct
        setSeriesPie(arr_series);
        setOptionPie(options_dup);
    }

    //fetch
    useEffect(() => {
        updateChart();
        getTimeBank(token).then( data => {
            console.log(data);
            setTimeBank(data);
        })
    },[]);

    function updateChart(){
        getWeekDataHomeTab(token).then(data => appendWeekData(data));
        getTodayDataHomeTab(token).then(data => appendTodayData(data));
    }

    if (!seriesPie) {
        return <>Still loading...</>;
    }

    return (

        <div>
            {/* {this.state.success && !this.state.fail && this.state.show &&
                <Alert onClose={() => { this.setState({ show: false, success: false, fail: false }) }} severity="success">Success</Alert>}

            {this.state.fail && !this.state.success && this.state.show &&
                <Alert onClose={() => { this.setState({ show: false, success: false, fail: false }) }} severity="error">Fail</Alert>} */}

            <div className="chart-wrap">
                <div id="chart">
                    <ReactApexChart
                        id="piechart"
                        options={optionsPie}
                        series={seriesPie}
                        type="donut" width={600}
                        align="center"
                    />
                </div>
            </div>

            <div id="chart">
                <ReactApexChart options={optionsBar} series={seriesBar} type="bar" height={350} width="1000px" margin="auto" position="relative" />
            </div>

            <Paper >
                <Tabs
                    sx={{ m: -2 }}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="disabled tabs example">
                    <Tab label={<div> <Dropdown display="Monday" name="mon" handleNewDate_and_hours={handleNewDate_and_hours} /> </div>} />
                    <Tab label={<div> <Dropdown display="Tuesday" name="tues" handleNewDate_and_hours={handleNewDate_and_hours} /> </div>} />
                    <Tab label={<div> <Dropdown display="Wednesday" name="weds" handleNewDate_and_hours={handleNewDate_and_hours} /> </div>} />
                    <Tab label={<div> <Dropdown display="Thursday" name="thurs" handleNewDate_and_hours={handleNewDate_and_hours} /> </div>} />
                    <Tab label={<div> <Dropdown display="Friday" name="fri" handleNewDate_and_hours={handleNewDate_and_hours} /> </div>} />
                    <Tab label={<div> <Dropdown display="Saturday" name="sat" handleNewDate_and_hours={handleNewDate_and_hours} /> </div>} />
                </Tabs>
            </Paper>


        </div>

    );
}