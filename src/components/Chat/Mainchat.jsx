import React, { useState, useRef } from 'react'
import { auth } from '../../firebase';
import { addMessage, getMessageQuery } from '../../database/messages';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getTime } from '../../helpers/helperfunctions';

function MainChat({ name, chatroom }) {

    const q = getMessageQuery(chatroom);
    const [messages] = useCollectionData(q, {idField: "id"});
    const [formValue, setFormValue] = useState("");

    const dummy = useRef();
    
    const sendMessage = async (e) => {
        e.preventDefault();
        const message = formValue;
        setFormValue("");
        await addMessage(auth.currentUser.uid, chatroom, message, name);
        dummy.current.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="mainchat">
            <p>{chatroom === "main" ? "Main chat" : chatroom}</p>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} {...msg} />)}
                <div ref={dummy}></div>
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
                <p className="messageInfo">{`${username} ${getTime(createdAt)}`}</p>
                <p className="text">{text}</p>
            </div>
        </div>
    );
};

export default MainChat
