import React, { useState, useEffect } from 'react'
import { GetUserContext } from '../../contexts/AuthenticationContext';
import { auth } from '../../firebase';
import { addMessage, fetchMessagesFromChat } from '../../database/messages';
import { fetchChatFromUser } from '../../database/users';

function MainChat() {

    //idea: get user, use user to get correct chatroom, use chatroom to get message
    //everytime the user changes, put a new snapshot that listens to the current user's chatroom

    const user = GetUserContext();
    const [chatroomId, setChatroomId] = useState("ofwhhGEcwWpyBo877prs"); //temporary
    const [messages, setMessages] = useState([]);
    const [formValue, setFormValue] = useState("");

    //some stuff here needs to be async
    useEffect(() => {
        const unsubscribe = fetchChatFromUser(user.uid, setChatroomId);
        return () => unsubscribe();
    }, [user]);

    useEffect(() => {
        const unsubscribe = fetchMessagesFromChat(chatroomId, setMessages);
        return () => unsubscribe();
    }, [chatroomId]);
    
    const sendMessage = (e) => {
        e.preventDefault();
        const message = formValue;
        setFormValue("");
        addMessage(auth.currentUser.uid, chatroomId, message);
    }

    //Takes the messages and displays them (do something when chatroom null too)
    return (
        <div className="mainchat">
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} uid={msg.uid} text={msg.text}/>)}
            </main>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={e => setFormValue(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

function ChatMessage({ uid, text, createdAt, name }) {
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

    return (
        <div className={`message ${messageClass}`}>
            <p>{text}</p>
        </div>
    );
};

export default MainChat
