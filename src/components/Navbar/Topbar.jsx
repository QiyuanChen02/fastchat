import { signOut } from 'firebase/auth';
import { GetUserContext } from '../../contexts/AuthenticationContext';
import { GetLoginModalUpdateContext } from '../../contexts/LoginModalContext';
import { GetSignupModalUpdateContext } from '../../contexts/SignupModalContext';

import { auth } from "../../firebase";
import Logo from './Logo';

const Navbar = () => {

    const toggleLoginModal = GetLoginModalUpdateContext();
    const toggleSignupModal = GetSignupModalUpdateContext();
    const user = GetUserContext();
    
    const logout = () => {
        signOut(auth);
    }

    return (
        <section className="topbar">
            <Logo />
            <nav>
                <ul>
                    {!user ? <li onClick={toggleLoginModal} tabIndex={0}>Login In</li> : null}
                    {!user ? <li onClick={toggleSignupModal} tabIndex={0}>Sign Up</li> : null}
                    {user ? <li onClick={logout} tabIndex={0}>Log Out</li> : null}
                </ul>
            </nav>
        </section>
    );
};

export default Navbar
