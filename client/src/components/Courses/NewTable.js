import { useContext, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { updateNote, updateExtendDeadline, updateDifficulty, markTaskCompleted, markTaskIncompleted } from "../../service/coursesService";
import UserContext from "../../context/user";
import Alert from "@mui/material/Alert";


export default function DataGridDemo({ tasks }) {
    const [err, setErr] = useState({ result: null, msg: null });
    const rows = tasks;
    const token = useContext(UserContext);

    const columns = [
        {
            field: "taskName",
            headerName: "Task",
            headerAlign: "center",
            align: "center",
            minWidth: 150,
        },
        {
            field: "difficulty",
            headerName: "Difficulty",
            type: 'singleSelect',
            valueOptions: [1, 2, 3, 4, 5],
            editable: true,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "weightedGrade",
            headerName: "Weighted Grade",
            minWidth: 150,
            type: "number",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "taskDeadline",
            headerName: "Deadline",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "note",
            headerName: "Notes",
            editable: true,
            type: "string",
            minWidth: 250,
            headerAlign: "center",
        },
        {
            field: "extendDeadline",
            headerName: "Extended Deadline",
            editable: true,
            type: "date",
            minWidth: 200,
            headerAlign: "center",
        },
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
    ];

    function updateCell(param) {
        const id = param.id;
        const field = param.field;
        const value = param.value;
        if (field.localeCompare("difficulty") === 0) {
            updateDifficulty(token, id, value).then(data => {
                setErr(data);
            });
        }
        else if (field.localeCompare("extendDeadline") === 0) {
            const date = value.toISOString().slice(0, 10);
            updateExtendDeadline(token, id, date).then(data => {
                setErr(data);
            });
        }
        else if (field.localeCompare("note") === 0) {
            updateNote(token, id, value).then(data => {
                setErr(data);
            })
        }
        else if (field.localeCompare("finishedDate") === 0) {
            if (value) {
                markTaskCompleted(token, id).then(data => {
                    setErr(data);
                })
            }
            else {
                markTaskIncompleted(token, id).then(data => {
                    setErr(data);
                })
            }
        }
        else {
            console.log("Error: Change of this column is not allowed!");
        }
    }

    return (
        <div style={{ height: '100%', width: '100%' }}>
            {err.result !== null ?
                <Alert
                    severity={err.result ? "success" : "error"}
                    onClose={() => { setErr({ result: null, msg: null }) }}
                    sx={{
                        width: 1,
                    }}>
                    <strong>{err.msg}</strong>
                </Alert>
                : <br />
            }
            {tasks.length !== 0 ?
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableSelectionOnClick
                    hideFooter
                    getRowId={(row) => row.taskID}
                    onCellEditCommit={(param) => {
                        updateCell(param);
                    }}
                />
                : <>This course has no task</>
            }
        </div>
    );
}

