import { useState } from "react"

import { signInWithEmailAndPassword, auth } from "../firebase.js";

import { GetUserUpdateContext } from "../contexts/AuthenticationContext";
import { GetLoginModalContext, GetLoginModalUpdateContext } from "../contexts/LoginModalContext";

export default function Login() {

    const changeUserStatus = GetUserUpdateContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logIn = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            changeUserStatus(res.user);
            //Something about storing the user to a database here
        } catch(e) {
            console.log(e.message);
        }
    }

    const loginModal = GetLoginModalContext();
    const updateLogin = GetLoginModalUpdateContext();
    if (loginModal){
        return (
            <>
                <div className="loginModal">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={() => logIn(email, password)}>Login In</button>
                </div>
                <div className="overlay" onClick={updateLogin}></div>
            </>
        )
    } else {
        return null
    }
}
