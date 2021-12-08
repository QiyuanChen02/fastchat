import { useState, useContext } from "react";

const UserContext = React.createContext(false);
const UpdateUserContext = React.createContext();

export const getUserContext = () => {
    return useContext(UserContext);
}

export const getUserUpdateContext = () => {
    return useContext(UpdateUserContext);
}

const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}

export default LoginProvider;
