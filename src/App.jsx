import './App.css'
import {Button, TextField} from "@mui/material";
import React from "react";

function App() {

    const [clockTimes, setClockTimes] = React.useState([{in: "", out: ""}]);
    const totalHoursMinusLunch = React.useMemo(() => calculateTotalHoursMinusLunch(), [clockTimes]);

    function hasTime() {
        return clockTimes.every((clockTime) => clockTime.in && clockTime.out);
    }

    function addRow() {
        setClockTimes([...clockTimes, {in: "", out:""}])
    }

    function updateClockTime(e, index, key) {
        let updatedClockTime = {
            ...clockTimes[index],
            [key]: e.target.value
        };
        setClockTimes([
            ...clockTimes.slice(0, index),
            updatedClockTime,
            ...clockTimes.slice(index, clockTimes.length - 1)
        ])
    }

    function displayRows() {
        return clockTimes.map((clockTime, index) => (
            <tr key={"clock-row-" + index}>
                <td> <TextField id="clock-in"
                                placeholder="e.g. 6:00"
                                variant="filled"
                                onChange={(e) => updateClockTime(e, index, 'in')}
                />
                </td>
                <td> <TextField id="clock-out"
                                placeholder="e.g. 15:00"
                                variant="filled"
                                onChange={(e) => updateClockTime(e, index, 'out')}
                />
                </td>
            </tr>
        ))
    }

    function calculateTotalHours() {
        return clockTimes.reduce((acc, current) => {
            let inParts = current.in.split(":");
            let outParts = current.out.split(":");
            let inMinutes = (inParts[0] * 60) + parseFloat(inParts[1]);
            let outMinutes = (outParts[0] * 60) + parseFloat(outParts[1]);
            acc += outMinutes - inMinutes;
            return acc;
        }, 0) / 60;
    }

    function calculateTotalHoursMinusLunch() {
        const days = Math.floor(calculateTotalHours() / 8)
        return (calculateTotalHours() - (days * 0.5)).toFixed(2);
    }

    return (
    <>
        <table>
            <thead>
            <tr>
                <th>Clock In</th>
                <th>Clock Out</th>
            </tr>
            </thead>
            <tbody>
            {displayRows()}
            <tr>
                <td colSpan={2}> <Button variant="contained" onClick={addRow}> + </Button> </td>
            </tr>
            </tbody>
        </table>
        {hasTime() ?
            <div>
                <p> Total time: {totalHoursMinusLunch} hours (minus lunch)</p>
            </div>
        : null}
    </>
  )
}

export default App
