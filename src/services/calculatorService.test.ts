import { expect, test, describe } from 'vitest';
import { calculateTotalHours, calculateTotalHoursMinusLunch } from './calculatorService';

describe('Calculator Service', () => {
    
    test('calculates total hours without lunch deduction', () => {
        const input = [{ in: "6:00", out: "15:00" }];
        expect(calculateTotalHours(input)).toBe(9);
    });

    test('calculates total hours with lunch deduction', () => {
        const input = [{ in: "6:00", out: "15:00" }];
        expect(calculateTotalHoursMinusLunch(input)).toBe("8.50");
    });

    test('handles multiple clock entries', () => {
        const input = [
            { in: "6:00", out: "10:00" }, // 4 hours
            { in: "11:00", out: "15:00" } // 4 hours
        ];
        expect(calculateTotalHours(input)).toBe(8);
        expect(calculateTotalHoursMinusLunch(input)).toBe("7.50");
    });

    test('handles multiple clock entries #2', () => {
        const input = [
            { in: "6:30", out: "10:00" },
            { in: "10:10", out: "15:00" }
        ];
        expect(Number(calculateTotalHours(input).toFixed(2))).toBe(8.33);
        expect(calculateTotalHoursMinusLunch(input)).toBe("7.83");
    });

});
