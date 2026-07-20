import {render, screen} from "@testing-library/react";
import App from "./App.jsx";
import { test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

test("Total time should not display on initial render.", () => {
    render(<App/>)

    const totalTime = screen.queryByText("Total time");

    expect(totalTime).toBeNull();
})

test("Total time should display once a clock in and clock out have been entered.", async () => {
    const user = userEvent.setup();
    render(<App/>)

    const clockInInput = screen.getByLabelText("clock in");
    const clockOutInput = screen.getByLabelText("clock out");

    expect(clockInInput).not.toBeNull();
    expect(clockOutInput).not.toBeNull();

    await user.type(clockInInput, '6:15');
    await user.type(clockOutInput, '15:15');

    expect(clockInInput.value).toBe('6:15');
    expect(clockOutInput.value).toBe('15:15');

    const totalTime = screen.getByText(/8.50 hours/);

    expect(totalTime).not.toBeNull();
})

