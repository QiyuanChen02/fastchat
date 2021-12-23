import React, { useState, useContext } from "react";

export const LoginModalContext = React.createContext(false);
export const UpdateLoginModalContext = React.createContext();

export const GetLoginModalContext = () => {
    return useContext(LoginModalContext);
}

export const GetLoginModalUpdateContext = () => {
    return useContext(UpdateLoginModalContext);
}

const LoginModalProvider = ({ children }) => {
    const [loginModal, setLoginModal] = useState(false);

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
