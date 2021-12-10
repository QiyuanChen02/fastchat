import UserProvider from "./AuthenticationContext";
import LoginModalProvider from "./LoginModalContext";
import SignupModalProvider from "./SignupModalContext";

function Contexts({ children }) {
    return (
        <LoginModalProvider>
            <SignupModalProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </SignupModalProvider>
        </LoginModalProvider>
    )
}

export default Contexts;
