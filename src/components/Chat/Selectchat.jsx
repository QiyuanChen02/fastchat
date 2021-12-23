import React from 'react'
import { GetUserContext } from '../../contexts/AuthenticationContext';
import { findAChat, returnToMain } from "../../database/chatrooms";

function Selectchat({ chatroom }) {

    const user = GetUserContext();

    return (
        <div className="selectchat">
            <button onClick={() => findAChat(user, chatroom)}>Find own chat</button>
            <button onClick={() => returnToMain(user, chatroom)}>Return to main</button>
        </div>
    )
}

export default Selectchat

//When return to main
//Have user chatroom set to main
//take member off the chat room
//if chatroom is empty, delete chatroom messages
//otherwise tell other user that chatroom is now empty