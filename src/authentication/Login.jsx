import { useState } from "react"

import { signInWithEmailAndPassword, auth } from "../firebase.js";

import { GetUserUpdateContext } from "../contexts/AuthenticationContext";
import { GetLoginModalContext, GetLoginModalUpdateContext } from "../contexts/LoginModalContext";

export default function Login() {

    const changeUserStatus = GetUserUpdateContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const logIn = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            changeUserStatus(res.user);
            //Something about storing the user to a database here
        } catch(e) {
            setError(e.message);
        }
    }

    const loginFormSubmit = e => {
        e.preventDefault();
        logIn(email, password);
    }

    const loginModal = GetLoginModalContext();
    const updateLoginModal = GetLoginModalUpdateContext();
    if (loginModal){
        return (
            <>
                <div className="loginModal">
                    <button className="close-modal" onClick={updateLoginModal}>&times;</button>
                    <div className="form-header">
                        <h3>Log in</h3>
                    </div>
                    <form onSubmit={loginFormSubmit}>
                        <label htmlFor="email">Email: </label>
                        <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <p>{error}</p>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="overlay" onClick={updateLoginModal}></div>
            </>
        )
    } else {
        return null
    }
}
