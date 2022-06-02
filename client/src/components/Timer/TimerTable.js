import {useContext} from "react";
import { DataGrid } from '@mui/x-data-grid';
import { updateNote, markTaskCompleted, markTaskIncompleted } from "../../service/coursesService";
import UserContext from "../../context/user";


export default function DataGridDemo({rows, setTime, setSecondSpent}) {
    const token = useContext(UserContext);
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
            field: "taskName",
            headerName: "Task",
            headerAlign: "center",
            align: "center",
            minWidth: 150,
        },
        {
            field: "secondSpent",
            headerName: "Time spent",
            minWidth: 150,
            type: "number",
            valueFormatter: (params) => {
                const valueFormatted = new Date(params.value * 1000).toISOString().substr(11, 8);
                return valueFormatted;
              },
        },
        {
            field: "time",
            headerName: "Time",
            minWidth: 150,
            type: "number",
            valueFormatter: (params) => {
                const valueFormatted = new Date(params.value * 1000).toISOString().substr(11, 8);
                return valueFormatted;
              },
        },
    ];

    function updateCell (param){
        const id = param.id;
        const field = param.field;
        const value = param.value;
        console.log(param);
        if (field.localeCompare("finishedDate") === 0){
            if (value){
                markTaskCompleted(token, id).then( data => {
                    console.log(data);
                })
            }
            else{
                markTaskIncompleted(token, id).then( data => {
                    console.log(data);
                })
            }
        }
        else{
            console.log("Error: Change of this column is not allowed!");
        }
    }

    function onTaskClick(param){
        const taskID = param.id;
        const time = param.row.time;
        console.log(time);
        setTime(param.row.time);
        setSecondSpent(param.row.secondSpent);
    }

    return (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    hideFooter
                    getRowId={(row) => row.taskID}
                    onCellEditCommit={(param) => {
                        updateCell(param);
                    }}
                    onRowClick={(param) => {
                        onTaskClick(param);
                    }}
                />
    );
}

