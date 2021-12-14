import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase";

const UserContext = React.createContext(false);

export const GetUserContext = () => {
    return useContext(UserContext);
}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
