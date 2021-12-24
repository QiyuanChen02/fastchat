import { GetLoginModalUpdateContext } from "../../contexts/LoginModalContext";
import { GetSignupModalUpdateContext } from "../../contexts/SignupModalContext";
import Logo from "./Logo.jsx";

function Landing() {

    const toggleLoginModal = GetLoginModalUpdateContext();
    const toggleSignupModal = GetSignupModalUpdateContext();

    return (
        <section className="landing">
            <header>
                <Logo />
                <h1>Fast Chat</h1>
            </header>
            
            <nav>
                <button onClick={toggleLoginModal} tabIndex={0}>Log In</button>
                <button onClick={toggleSignupModal} tabIndex={0}>Sign Up</button>
            </nav>
        </section>
    )
}

export default Landing;
