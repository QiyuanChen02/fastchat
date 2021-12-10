import { useState } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { GetSignupModalContext, GetSignupModalUpdateContext } from "../contexts/SignupModalContext";

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const signUp = async (email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            alert("User created"); //Still need to add to database (maybe in another folder?)
        } catch (e){
            setError(e.message);
        }
    }

    const signupFormSubmit = e => {
        e.preventDefault();
        signUp(email, password);
    } 

    const signUpModal = GetSignupModalContext();
    const updateSignUpModal = GetSignupModalUpdateContext();
    if (signUpModal){
        return (
            <>
                <div className="signupModal">
                    <button className="close-modal" onClick={updateSignUpModal}>&times;</button>
                    <div className="form-header">
                        <h3>Sign Up</h3>
                    </div>
                    <form onSubmit={signupFormSubmit}>
                        <label htmlFor="email">Email: </label>
                        <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
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
