import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../Login.jsx";
import { LoginModalContext } from "../../contexts/LoginModalContext.jsx";

const MockLogin = () => {
    return (
        <LoginModalContext.Provider value={true}>
            <Login />
        </LoginModalContext.Provider>
    );
};

const logOut = () => {
    const logoutElement = screen.queryByText(/Log Out/i);
    if (logoutElement) {
        fireEvent.click(logoutElement);
    }
};

afterAll(logOut);

test("login panel successfully rendered", () => {
    render(<MockLogin />);
    const titleElement = screen.getByText(/Log In/i);
    expect(titleElement).toBeInTheDocument();
});

test("Email and password text successfully changes when typed", () => {
    render(<MockLogin />);
    const emailElement = screen.getByLabelText(/Email:/i);
    const passwordElement = screen.getByLabelText(/Password:/i);
    fireEvent.change(emailElement, {
        target: { value: "qiyuan.chen2002@gmail.com" },
    });
    expect(emailElement.value).toBe("qiyuan.chen2002@gmail.com");
    fireEvent.change(passwordElement, { target: { value: "hunter2" } });
    expect(passwordElement.value).toBe("hunter2");
});

test("Modal closes when x clicked", () => {
    render(<MockLogin />);
    const crossElement = screen.getByText("×");
    fireEvent.click(crossElement);
    const titleElement = screen.queryByText("Log in");
    expect(titleElement).toBeNull;
});

test("Modal closes when submit clicked", () => {
    render(<MockLogin />);
    const submitElement = screen.getByText(/Submit/i);
    fireEvent.click(submitElement);
    const titleElement = screen.queryByText("Log in");
    expect(titleElement).toBeNull;
});
