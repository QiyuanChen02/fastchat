import { useState } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { GetSignupModalContext } from "./SignupModalContext";

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = async (email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            alert("User created"); //Unfinished
        } catch (e){
            console.log(e.message);
        }
    }

    const SignUpModal = GetSignupModalContext();
    console.log("SingUpModal", SignUpModal)
    if (SignUpModal){
        return (
            <>
                <div className="signupModal">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={() => signUp(email, password)}>Sign Up</button>
                </div>
                <div className="overlay"></div>
            </>
        )
    } else {
        return null
    }
}
