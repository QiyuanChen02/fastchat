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
                <button onClick={() => returnToSelection(uid, chatroom)}>
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                    </svg>
                    <p>Home</p>
                </button>
                <h2>{chatroom === "main" ? "Main Chat" : "Random Chat"}</h2>
                <button onClick={() => findAChat(uid, chatroom)}>
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M10,4A4,4 0 0,1 14,8C14,8.91 13.69,9.75 13.18,10.43C12.32,10.75 11.55,11.26 10.91,11.9L10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M2,20V18C2,15.88 5.31,14.14 9.5,14C9.18,14.78 9,15.62 9,16.5C9,17.79 9.38,19 10,20H2Z" />
                    </svg>
                    <p>New Chat</p>
                </button>
            </header>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} {...msg} />)}
                <div ref={dummy}></div>
            </main>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={e => setFormValue(e.target.value)} placeholder='Message...'/>
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


