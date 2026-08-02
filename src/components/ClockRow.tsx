import React from "react";
import { TextField } from "@mui/material";
import { ClockTime } from "../types/ClockTime";

interface ClockRowProps {
    index: number;
    updateClockTime: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, key: keyof ClockTime) => void;
}

export function ClockRow({ index, updateClockTime }: ClockRowProps) {
    return (
        <tr className="clock-row">
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
    );
}
