//Unfinished
export default function SignUp() {
    return (
        <>
            <div className="signupModal">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => createUserWithEmailAndPassword(email, password)}>Sign Up</button>
            </div>
            <div className="overlay"></div>
        </>
    )
}
