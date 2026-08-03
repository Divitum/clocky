import { ClockTime } from "../types/ClockTime";

export function calculateTotalHours(clockTimes: ClockTime[]) {
    return clockTimes.reduce((acc, current) => {
        let inParts = current.in.split(":");
        let outParts = current.out.split(":");
        let inMinutes = (Number(inParts[0]) * 60) + parseFloat(inParts[1]);
        let outMinutes = (Number(outParts[0]) * 60) + parseFloat(outParts[1]);
        acc += outMinutes - inMinutes;
        return acc;
    }, 0) / 60;
}

export function calculateTotalHoursMinusLunch(clockTimes: ClockTime[], days: number) {
    const totalHours = calculateTotalHours(clockTimes);
    let lunchTotal = days * 0.5;
    return (totalHours - lunchTotal).toFixed(2);
}
