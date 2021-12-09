import logo from '../assets/clock.png'
import { GetLoginModalUpdateContext } from '../authentication/LoginModalContext';
import { GetSignupModalUpdateContext } from '../authentication/SignupModalContext';

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
