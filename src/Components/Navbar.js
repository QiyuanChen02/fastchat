import React from 'react'

import logo from '../clock.png'

const Navbar = () => {

    const loginModal = () => alert("login");
    const signupModal = () => alert("signup");
    return (
        <div className="topbar">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <nav>
                <ul>
                    <li onClick={loginModal} tabIndex={0}>Login In</li>
                    <li onClick={signupModal} tabIndex={0}>Contact</li>
                </ul>
            </nav>
        </div>
    )
};

export default Navbar
