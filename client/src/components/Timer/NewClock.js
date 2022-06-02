import React, { useContext, useEffect, useRef, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import UserContext from "../../context/user";
import { updateSecondSpent } from "../../service/timerService";

export default function FullClock({ taskID, time, timeLeft, updateTable, setTime }) {
    const clockRef = useRef();
    const token = useContext(UserContext);
    const handleStart = () => clockRef.current.start();
    const handlePause = () => {
        clockRef.current.pause();
    }

    function updateData (param) {
        let nowLeft = param.total/1000;
        const timeSpent = time - nowLeft;
        console.log(timeSpent);
        updateSecondSpent(token, taskID, timeSpent).then(data => {
            console.log(data);
        });
        updateTable();
        setTime(nowLeft);
    };

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return(
                <div style={{ fontSize: "100px" }}>
                 {/* <h5>Great job!!!</h5> */}
                <span>{zeroPad(hours)}</span>:<span>{zeroPad(minutes)}</span>:<span>{zeroPad(seconds)}</span>
            </div>
            )
        } else {
            // Render a countdown
            return (
                <div style={{ fontSize: "100px" }}>
                    <span>{zeroPad(hours)}</span>:<span>{zeroPad(minutes)}</span>:<span>{zeroPad(seconds)}</span>
                </div>
            );
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <Countdown
                date={Date.now() + timeLeft * 1000}
                renderer={renderer}
                ref={clockRef}
                autoStart={false}
                onPause={updateData}
            />
            <button
                className="buttonApp"
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleStart}
            >
                RESUME
            </button>
            <button
                className="buttonApp"
                variant="contained"
                color="primary"
                type="submit"
                onClick={handlePause}
            >
                PAUSE
            </button>
        </div>
    );
}