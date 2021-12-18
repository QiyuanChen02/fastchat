import React, { useState, useEffect } from 'react'
import { GetUserContext } from '../../contexts/AuthenticationContext';
import { auth } from '../../firebase';
import { addMessage, fetchMessagesFromChat } from '../../database/messages';
import { fetchUserDetails, fetchChatFromUser } from '../../database/users';

function MainChat() {

    const user = GetUserContext();
    const [username, setUsername] = useState("");
    const [chatroomId, setChatroomId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [formValue, setFormValue] = useState("");
    
    useEffect(async () => {
        const data = await fetchUserDetails(user.uid);
        setUsername(data.name);
        //setChatroomId(data.chatroom);
    }, [user]); //want to call this everytime some user details change, e.g change chatroom

    useEffect(() => {
        const unsubscribe = fetchChatFromUser(user.uid, setChatroomId);
        return () => unsubscribe();
    }, [user]);

    useEffect(() => {
        const unsubscribe = fetchMessagesFromChat(chatroomId, setMessages);
        return () => unsubscribe();
    }, [chatroomId]);
    
    const sendMessage = e => {
        e.preventDefault();
        const message = formValue;
        setFormValue("");
        addMessage(auth.currentUser.uid, username, chatroomId || "main", message);
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
