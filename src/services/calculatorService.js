export function calculateTotalHours(clockTimes) {
    return clockTimes.reduce((acc, current) => {
        let inParts = current.in.split(":");
        let outParts = current.out.split(":");
        let inMinutes = (inParts[0] * 60) + parseFloat(inParts[1]);
        let outMinutes = (outParts[0] * 60) + parseFloat(outParts[1]);
        acc += outMinutes - inMinutes;
        return acc;
    }, 0) / 60;
}

export function calculateTotalHoursMinusLunch(clockTimes) {
    const totalHours = calculateTotalHours(clockTimes);
    const days = Math.floor(totalHours / 8);
    return (totalHours - (days * 0.5)).toFixed(2);
}
