import logo from '../assets/clock.png'
import { GetLoginModalUpdateContext } from '../contexts/LoginModalContext';
import { GetSignupModalUpdateContext } from '../contexts/SignupModalContext';

const Navbar = () => {

    const toggleLoginModal = GetLoginModalUpdateContext();
    const toggleSignupModal = GetSignupModalUpdateContext();

    const loginModal = () => toggleLoginModal();
    const signupModal = () => toggleSignupModal();
    const toggleLightDarkMode = () => alert("toggled");

    //Add toggle light dark mode
    return (
        <div className="topbar">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <nav>
                <ul>
                    <li onClick={loginModal} tabIndex={0}>Login In</li>
                    <li onClick={signupModal} tabIndex={0}>Sign Up</li>
                    <li onClick={toggleLightDarkMode} tabIndex={0}>Dark Mode</li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar
