import { signOut } from 'firebase/auth';
import { findAChat, goToMain } from "../../database/chatrooms";
import { auth } from '../../firebase';
import Logo from '../Landing/Logo';

function Selectchat({ uid, chatroom, name }) {

    return (
        <section className="selectchat">
            <header>
                <Logo />
                <h1>Fast Chat</h1>
            </header>
            <nav>
                <button onClick={() => goToMain(uid)}>Main Chat</button>
                <button onClick={() => findAChat(uid, chatroom, name)}>Random Chat</button>
                <button onClick={() => signOut(auth)}>Sign Out</button>
            </nav>   
        </section>
    )
}

export default Selectchat;

//When return to main
//Have user chatroom set to main
//take member off the chat room
//if chatroom is empty, delete chatroom messages
//otherwise tell other user that chatroom is now empty