import { useState } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { GetSignupModalContext, GetSignupModalUpdateContext } from "../contexts/SignupModalContext";

import { errorMessage } from "../helpers/helperfunctions";

import { addUser } from "../database/users";
export default function SignUp() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const signUp = async (email, password) => {
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            addUser(cred.user.uid, username);
            updateSignUpModal();
        } catch (e){
            setError(errorMessage(e.code));
        }
    }

    const signUpModal = GetSignupModalContext();
    const updateSignUpModal = GetSignupModalUpdateContext();

    const signupFormSubmit = e => {
        e.preventDefault();
        if (confirmPassword !== password){
            setError("The passwords entered do not match");
        } else {
            signUp(email, password);
        }
    } 

    return (
        <section className={`signupModal ${signUpModal ? "active" : ""}`}>
            <button className="close-modal" onClick={updateSignUpModal}>&times;</button>
            <div className="form-header">
                <h2>Sign Up</h2>
            </div>
            <form onSubmit={signupFormSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <p>{error ? error : '\u00A0'}</p>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </section>
    )
}
