import React, { useState, useRef } from 'react'
import { auth } from '../../firebase';
import { addMessage, getMessageQuery } from '../../database/messages';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './Chatmessage';
import { findAChat, returnToSelection } from '../../database/chatrooms';

function MainChat({ uid, name, chatroom }) {

    const q = getMessageQuery(chatroom);
    const [messages] = useCollectionData(q, {idField: "id"});
    const [formValue, setFormValue] = useState("");

    const dummy = useRef();
    
    const sendMessage = async (e) => {
        e.preventDefault();
        if (formValue){
            await addMessage(auth.currentUser.uid, chatroom, formValue, name);
            setFormValue("");
            dummy.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <section className="mainchat">
            <header>
                <button onClick={() => returnToSelection(uid, chatroom)}>Home</button>
                <h3>{chatroom === "main" ? "Main Chat" : "Random Chat"}</h3>
                <button onClick={() => findAChat(uid, chatroom)}>New chat</button>
            </header>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} {...msg} />)}
                <div ref={dummy}></div>
            </main>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={e => setFormValue(e.target.value)} />
                <button type="submit">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                    </svg>
                </button>
            </form>
        </section>
    );
};

export default MainChat
