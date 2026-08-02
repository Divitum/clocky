import './App.css'
import {Button, TextField} from "@mui/material";
import React from "react";
import { calculateTotalHoursMinusLunch } from "./services/calculatorService";
import { ClockTime } from "./types/ClockTime";
import { ClockRow } from "./components/ClockRow";
import {ClockDivider} from "./components/ClockDivider.tsx";

function App() {

    const [days, setDays] = React.useState(1);
    const [clockTimes, setClockTimes] = React.useState<ClockTime[]>([{day: 1, in: "", out: ""}]);
    const totalHoursMinusLunch = React.useMemo(() => calculateTotalHoursMinusLunch(clockTimes), [clockTimes]);

    function hasTime() {
        return clockTimes.every((clockTime) => clockTime.in && clockTime.out);
    }

    function addRow() {
        setClockTimes([...clockTimes, {day: days, in: "", out:""}])
    }

    function addDay() {
        setDays(days + 1);
    }

    function updateClockTime(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, key: keyof ClockTime) {
        let updatedClockTime = {
            ...clockTimes[index],
            [key]: e.target.value
        };
        setClockTimes([
            ...clockTimes.slice(0, index),
            updatedClockTime,
            ...clockTimes.slice(index + 1, clockTimes.length)
        ])
    }

    function clockRows() {
        return clockTimes.map((clockTime, index, originalArray) => {
            let showDivider = index !== originalArray.length - 1 && originalArray[index + 1].day !== clockTime.day;
            return (
                <React.Fragment key={"clock-row-holder-" + index}>
                    <ClockRow key={"clock-row-" + index} index={index} updateClockTime={updateClockTime}/>
                    {showDivider ? <ClockDivider key={"clock-divider-" + index}/> : null}
                </React.Fragment>
            );
        })
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
                <td colSpan={2}> 
                    <Button variant="contained" onClick={addRow}> Add Row </Button>
                    <Button variant="outlined" onClick={addDay} sx={{ marginLeft: 1 }}> Add Day </Button>
                </td>
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
