import './App.css'
import {Button, TextField} from "@mui/material";
import React from "react";
import { calculateTotalHoursMinusLunch } from "./services/calculatorService";
import { ClockTime } from "./types/ClockTime";

function App() {

    const [clockTimes, setClockTimes] = React.useState<ClockTime[]>([{in: "", out: ""}]);
    const totalHoursMinusLunch = React.useMemo(() => calculateTotalHoursMinusLunch(clockTimes), [clockTimes]);

    function hasTime() {
        return clockTimes.every((clockTime) => clockTime.in && clockTime.out);
    }

    function addRow() {
        setClockTimes([...clockTimes, {in: "", out:""}])
    }

    function updateClockTime(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, key: keyof ClockTime) {
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

    function clockRows() {
        return clockTimes.map((clockTime, index) => (
            <tr key={"clock-row-" + index} className="clock-row">
                <td> <TextField id="clock-in"
                                label="clock in"
                                placeholder="e.g. 6:00"
                                variant="filled"
                                onChange={(e) => updateClockTime(e, index, 'in')}
                />
                </td>
                <td> <TextField id="clock-out"
                                label="clock out"
                                placeholder="e.g. 15:00"
                                variant="filled"
                                onChange={(e) => updateClockTime(e, index, 'out')}
                />
                </td>
            </tr>
        ))
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
            {clockRows()}
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
