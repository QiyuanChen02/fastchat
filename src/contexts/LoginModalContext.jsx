import React, { useState, useContext } from "react";

const LoginModalContext = React.createContext(false);
const UpdateLoginModalContext = React.createContext();

export const GetLoginModalContext = () => {
    return useContext(LoginModalContext);
}

export const GetLoginModalUpdateContext = () => {
    return useContext(UpdateLoginModalContext);
}

const LoginModalProvider = ({ children }) => {
    const [loginModal, setLoginModal] = useState(false);

    //Edit this code to be easier to use
    const changeLoginModalStatus = () => {
        setLoginModal(loginModal => !loginModal);
    }

    return (
        <LoginModalContext.Provider value={loginModal}>
            <UpdateLoginModalContext.Provider value={changeLoginModalStatus}>
                {children}
            </UpdateLoginModalContext.Provider>
        </LoginModalContext.Provider>
    );
}

export default LoginModalProvider;
