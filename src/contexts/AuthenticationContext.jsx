import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const UserContext = React.createContext(false);

export const GetUserContext = () => {
    return useContext(UserContext);
}

const UserProvider = ({ children }) => {
    const [user] = useAuthState(auth);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
