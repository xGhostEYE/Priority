
import { useEffect, useState } from 'react';
import OldClock from './Timer/Clock';
import Clock from './Timer/NewClock';
import { useContext } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { updateNote, markTaskCompleted, markTaskIncompleted } from "../service/coursesService";
import UserContext from "../context/user";
import { getTodayDataHomeTab } from '../service/homeService';

export default () => {
  const token = useContext(UserContext);
  const [rows, setRows] = useState(null);

  useEffect( () => {
    updateTable();
  },[]);

  function updateTable(){
    getTodayDataHomeTab(token).then( data => setRows(data));
    console.log("dkvnk")
  }
  const [time, setTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [taskID, setTaskID] = useState(0);

  const columns = [
    {
      field: "finishedDate",
      headerName: "Completed?",
      type: "boolean",
      valueFormatter: (params) => {
        const valueFormatted = params.value !== null ? true : false;
        return valueFormatted;
      },
      editable: true,
    },
    {
      field: "Task",
      headerName: "Task",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
    },
    {
      field: "Task",
      headerName: "Task",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
    },
    {
      field: "Class",
      headerName: "Class",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
    },
    {
      field: "Time",
      headerName: "Expected Time",
      minWidth: 150,
      type: "number",
      valueFormatter: (params) => {
        const valueFormatted = new Date(params.value * 60 * 60 * 1000).toISOString().substr(11, 8);
        return valueFormatted;
      },
    },
    {
      field: "SecondSpent",
      headerName: "Time spent",
      minWidth: 150,
      type: "number",
      valueFormatter: (params) => {
        const valueFormatted = new Date(params.value * 1000).toISOString().substr(11, 8);
        return valueFormatted;
      },
    },
    {
      field: "timeLeft",
      headerName: "Time Left",
      minWidth: 150,
      type: "number",
      valueGetter: getTimeLeft,
      valueFormatter: (params) => {
        const valueFormatted = new Date(params.value * 1000).toISOString().substr(11, 8);
        return valueFormatted;
      },
    },
  ];

  function getTimeLeft(params){
    const timeLeft = Math.floor(params.row.Time * 60 * 60 - params.row.SecondSpent);
    return timeLeft;
  }

  function updateCell(param) {
    const id = param.id;
    const field = param.field;
    const value = param.value;
    console.log(param);
    if (field.localeCompare("finishedDate") === 0) {
      if (value) {
        markTaskCompleted(token, id).then(data => {
          console.log(data);
        })
      }
      else {
        markTaskIncompleted(token, id).then(data => {
          console.log(data);
        })
      }
    }
    else {
      console.log("Error: Change of this column is not allowed!");
    }
  }

  function onTaskClick(param) {
    const taskID = param.id;
    const time = Math.floor(param.row.Time * 60 * 60);
    const timeLeft = time - param.row.SecondSpent;
    setTaskID(taskID);
    setTime(time);
    setTimeLeft(timeLeft);
  }

  function updateTime(time){
    setTimeLeft(time);
  }

  if (!rows){
    return <>Still loading...</>;
  }

  return (
    <div className='tabComponent'>
      <Clock time={time} timeLeft={timeLeft} taskID={taskID} updateTable={updateTable} setTime={updateTime}/>
      <div style={{ width: '100%', height: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
          getRowId={(row) => row.TaskID}
          onCellEditCommit={(param) => {
            updateCell(param);
          }}
          onRowClick={(param) => {
            onTaskClick(param);
          }}
        />
      </div>
    </div>
  )
}
