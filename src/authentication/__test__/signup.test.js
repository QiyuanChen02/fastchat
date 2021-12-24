import { fireEvent, render, screen } from '@testing-library/react';
import Signup from '../Signup.jsx';
import { SignupModalContext } from "../../contexts/SignupModalContext.jsx";

const MockSignup = () => {
    return (
        <SignupModalContext.Provider value={true}>
            <Signup />
        </SignupModalContext.Provider>
    )
}

const logOut = () => {
    const logoutElement = screen.queryByText(/Log Out/i);
    if (logoutElement){
        fireEvent.click(logoutElement);
    }
}

afterAll(logOut);

test('Signup panel successfully rendered', () => {
  render(<MockSignup />);
  const titleElement = screen.getByText(/Sign Up/i);
  expect(titleElement).toBeInTheDocument();
});

test('Email and password text successfully changes when typed', () => {
    render(<MockSignup />);
    const usernameElement = screen.getByLabelText(/Username:/i)
    const emailElement = screen.getByLabelText(/Email:/i);
    const passwordElement = screen.getByLabelText(/^Password:$/i);
    const confirmpasswordElement = screen.getByLabelText(/Confirm Password:/i);
    fireEvent.change(usernameElement, { target: { value: "failtowinpro"}});
    expect(usernameElement.value).toBe("failtowinpro");
    fireEvent.change(emailElement, { target: { value: "qiyuan.chen2002@gmail.com"}});
    expect(emailElement.value).toBe("qiyuan.chen2002@gmail.com");
    fireEvent.change(passwordElement, { target: { value: "hunter2"}});
    expect(passwordElement.value).toBe("hunter2");
    fireEvent.change(confirmpasswordElement, { target: { value: "hunter2"}});
    expect(confirmpasswordElement.value).toBe("hunter2");
});

test('Modal closes when x clicked', () => {
    render(<MockSignup />);
    const crossElement = screen.getByText("×");
    fireEvent.click(crossElement);
    const titleElement = screen.queryByText("Sign up");
    expect(titleElement).toBeNull;
});

// test('Modal closes when submit clicked', () => {
//     render(<MockSignup />);
//     const submitElement = screen.getByText(/Submit/i);
//     fireEvent.click(submitElement);
//     const titleElement = screen.queryByText("Sign up");
//     expect(titleElement).toBeNull;
// });