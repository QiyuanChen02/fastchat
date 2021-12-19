import React from 'react'
import { GetUserContext } from '../../contexts/AuthenticationContext';
import { findAChat } from "../../database/chatrooms";

function Selectchat() {

    const user = GetUserContext();

    return (
        <div>
            <button onClick={() => findAChat(user)}>Find own chat</button>
        </div>
    )
}

export default Selectchat
