import React, { useState } from 'react'
import { auth } from '../../firebase';
import { addMessage, getMessageQuery } from '../../database/messages';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getTime } from '../../helpers/helperfunctions';

function MainChat({ name, chatroom }) {

    const q = getMessageQuery(chatroom);
    const [messages] = useCollectionData(q, {idField: "id"});
    const [formValue, setFormValue] = useState("");
    
    const sendMessage = (e) => {
        e.preventDefault();
        const message = formValue;
        setFormValue("");
        addMessage(auth.currentUser.uid, name, chatroom, message);
    }

    return (
        <div className="mainchat">
            <main>
                {messages && messages.map(msg => ({...msg, createdAt: getTime(msg.createdAt.toDate())})) //Converts stored data to a form which can be shown
                                     .map(msg => <ChatMessage key={msg.id} {...msg} />)}
            </main>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={e => setFormValue(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

function ChatMessage({ uid, text, createdAt, username }) {
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

    return (
        <div className={`messageWrapper ${messageClass}`}>
            <div className="message">
                <p className="messageInfo">{`${username} ${createdAt}`}</p>
                <p className="text">{text}</p>
            </div>
        </div>
    );
};

export default MainChat
