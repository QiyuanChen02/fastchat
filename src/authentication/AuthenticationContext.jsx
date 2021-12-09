import React, { useState, useContext } from "react";

const UserContext = React.createContext(false);
const UpdateUserContext = React.createContext();

export const GetUserContext = () => {
    return useContext(UserContext);
}

export const GetUserUpdateContext = () => {
    return useContext(UpdateUserContext);
}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const changeUserStatus = (newStatus) => {
        setUser(newStatus);
    }

    return (
        <UserContext.Provider value={user}>
            <UpdateUserContext.Provider value={changeUserStatus}>
                {children}
            </UpdateUserContext.Provider>
        </UserContext.Provider>
    );
}

export default UserProvider;
