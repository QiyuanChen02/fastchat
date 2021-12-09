import { useState } from "react"

import { initializeApp } from "firebase/app";

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { GetUserUpdateContext } from "./AuthenticationContext";
import { GetLoginModalContext } from "./LoginModalContext";

//Remember to add firebase js
const firebase = initializeApp({
    apiKey: "AIzaSyACBQxVSK5k4yt1sPDcy0ZAeXASDgmR0_A",
    authDomain: "qchen-chat.firebaseapp.com",
    projectId: "qchen-chat",
    storageBucket: "qchen-chat.appspot.com",
    messagingSenderId: "948407960054",
    appId: "1:948407960054:web:1f0dcdd0ccf31741da07d7",
    measurementId: "G-42XSYPX1V3"
});

const auth = getAuth();

export default function Login() {

    const changeUserStatus = GetUserUpdateContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            changeUserStatus(res.user);
            //Something about storing the user to a database here
        } catch(e) {
            console.log(e.message);
        }
    }

    const LoginModal = GetLoginModalContext();
    console.log("Login modal ...: ", LoginModal);
    if (LoginModal){
        return (
            <>
                <div className="loginModal">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={() => signIn(email, password)}>Login In</button>
                </div>
                <div className="overlay"></div>
            </>
        )
    } else {return null}
}
