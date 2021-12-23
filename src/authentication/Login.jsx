import { useState } from "react"

import { auth } from "../firebase.js";

import { GetLoginModalContext, GetLoginModalUpdateContext } from "../contexts/LoginModalContext";

import { errorMessage } from "../helpers/helperfunctions";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const logIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            updateLoginModal();
        } catch(e) {
            console.log("🚀 ~ file: Login.jsx ~ line 22 ~ logIn ~ e.code", e.code)
            setError(errorMessage(e.code));
        }
    }

    const loginModal = GetLoginModalContext();
    const updateLoginModal = GetLoginModalUpdateContext();

    const loginFormSubmit = e => {
        e.preventDefault();
        logIn(email, password);
    }
    
    if (loginModal){
        return (
            <section className="loginModal">
                <button className="close-modal" onClick={updateLoginModal}>&times;</button>
                <div className="form-header">
                    <h2>Log In</h2>
                </div>
                <form onSubmit={loginFormSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <p>{error ? error : '\u00A0'}</p>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </section>
        )
    } else {
        return null
    }
}
