import React, { useState, useContext, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const UserContext = React.createContext(false);

export const GetUserContext = () => {
    return useContext(UserContext);
}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, newUser => {
            console.log(newUser);
            setUser(newUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
