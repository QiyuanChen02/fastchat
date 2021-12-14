import UserProvider from "./AuthenticationContext";
import LoginModalProvider from "./LoginModalContext";
import SignupModalProvider from "./SignupModalContext";

function Contexts({ children }) {

    //Will edit this if performance becomes an issue
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
