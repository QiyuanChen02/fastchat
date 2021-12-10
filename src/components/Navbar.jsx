import { signOut } from 'firebase/auth';
import logo from '../assets/clock.png'
import { GetUserContext, GetUserUpdateContext } from '../contexts/AuthenticationContext';
import { GetLoginModalUpdateContext } from '../contexts/LoginModalContext';
import { GetSignupModalUpdateContext } from '../contexts/SignupModalContext';

import { auth } from "../firebase";

const Navbar = () => {

    const toggleLoginModal = GetLoginModalUpdateContext();
    const toggleSignupModal = GetSignupModalUpdateContext();
    const user = GetUserContext();
    const updateUser = GetUserUpdateContext();

    const toggleLightDarkMode = () => alert("toggled");
    
    const logout = async () => {
        await signOut(auth); //Not sure if this line is needed but maybe prevent problems with auth later on
        updateUser(null);
    }

    return (
        <div className="topbar">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <nav>
                <ul>
                    {!user ? <li onClick={toggleLoginModal} tabIndex={0}>Login In</li> : null}
                    {!user ? <li onClick={toggleSignupModal} tabIndex={0}>Sign Up</li> : null}
                    {user ? <li onClick={logout} tabIndex={0}>Log Out</li> : null}
                    <li onClick={toggleLightDarkMode} tabIndex={0}>Dark Mode</li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar
