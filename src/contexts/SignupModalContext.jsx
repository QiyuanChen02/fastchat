import React, { useState, useContext } from "react";

export const SignupModalContext = React.createContext(false);
export const UpdateSignupModalContext = React.createContext();

export const GetSignupModalContext = () => {
    return useContext(SignupModalContext);
}

export const GetSignupModalUpdateContext = () => {
    return useContext(UpdateSignupModalContext);
}

const SignupModalProvider = ({ children }) => {
    const [SignupModal, setSignupModal] = useState(false);

    const changeSignupModalStatus = () => {
        setSignupModal(SignupModal => !SignupModal);
    }

    return (
        <SignupModalContext.Provider value={SignupModal}>
            <UpdateSignupModalContext.Provider value={changeSignupModalStatus}>
                {children}
            </UpdateSignupModalContext.Provider>
        </SignupModalContext.Provider>
    );
}

export default SignupModalProvider;
