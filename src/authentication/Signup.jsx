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
            addUser(cred.user.uid, username); //Still need to add to database (maybe in another folder?)
            updateSignUpModal();
        } catch (e){
            console.log("🚀 ~ file: Signup.jsx ~ line 17 ~ signUp ~ e", e.code);
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

    if (signUpModal){
        return (
            <>
                <div className="signupModal">
                    <button className="close-modal" onClick={updateSignUpModal}>&times;</button>
                    <div className="form-header">
                        <h3>Sign Up</h3>
                    </div>
                    <form onSubmit={signupFormSubmit}>
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                        <label htmlFor="email">Email: </label>
                        <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="confirmPassword">Confirm Password: </label>
                        <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        <p>{error}</p>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="overlay" onClick={updateSignUpModal}></div>
            </>
        )
    } else {
        return null
    }
}
