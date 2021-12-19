import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase';
import { addMessage, fetchMessagesFromChat } from '../../database/messages';

function MainChat({ name, chatroom: chatroomId }) {

    const [messages, setMessages] = useState([]);
    const [formValue, setFormValue] = useState("");

    useEffect(() => {
        const unsubscribe = fetchMessagesFromChat(chatroomId, setMessages);
        return () => unsubscribe();
    }, [chatroomId]);
    
    const sendMessage = (e) => {
        e.preventDefault();
        const message = formValue;
        setFormValue("");
        addMessage(auth.currentUser.uid, name, chatroomId, message);
    }

    return (
        <div className="mainchat">
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} {...msg} />)}
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
        <div className={`message ${messageClass}`}>
            <p>{createdAt}</p>
            <p>{username}</p>
            <p>{text}</p>
        </div>
    );
};

export default MainChat
