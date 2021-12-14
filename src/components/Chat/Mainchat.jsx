import { collection, limit, onSnapshot, orderBy, query, where, doc } from 'firebase/firestore';
import { db } from "../../firebase";
import React, { useState, useEffect } from 'react'
import { GetUserContext } from '../../contexts/AuthenticationContext';
import { auth } from '../../firebase';

function MainChat() {

    //idea: get user, use user to get correct chatroom, use chatroom to get message
    //everytime the user changes, put a new snapshot that listens to the current user's chatroom

    const user = GetUserContext();
    const [chatroomId, setChatroomId] = useState("ofwhhGEcwWpyBo877prs");
    const [messages, setMessages] = useState([]);

    //fetchGroupByUserID
    useEffect(() => {
        const chatroomRef = collection(db, "chatrooms");
        const q = query(chatroomRef, where("members", "array-contains", user.uid), limit(1));
        const unsubscribe = onSnapshot(q, snapshot => {
            snapshot.forEach(doc => setChatroomId(doc.id));
        });

        return () => unsubscribe();
    }, [user]);

    //fetchMessageByGroupID
    useEffect(() => {
        console.log("ChatroomID: ",chatroomId);
        const chatroom = doc(db, "chatrooms", chatroomId);
        const messagesRef = collection(chatroom, "messages");
        const q = query(messagesRef, /*orderBy("createdAt"), */limit(25));
        const unsubscribe = onSnapshot(q, snapshot => {
            
            const messageList = [];
            snapshot.forEach(doc => {
                console.log("HELLO", doc.data());
                messageList.push(doc.data().message);
            });
            console.log("🚀 ~ file: Mainchat.jsx ~ line 34 ~ useEffect ~ messageList", messageList);
            setMessages(messageList);
        });

        return () => unsubscribe();
    }, [chatroomId]);


    //Takes the messages and displays them (do something when chatroom null too)
    return (
        <>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
            </main>
            {/* <form onSubmit={sendMessage}>
                <input value={formValue} onChange={e => setFormValue(e.target.value)} />
                <button type="submit">Send</button>
            </form> */}
        </>
    );
};

function ChatMessage({ uid, text, createAt, name }) {
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

    return (
        <div className={`message ${messageClass}`}>
            <div>
                <p>{name}</p>
                <p>{createAt}</p>
            </div>
            <p>{text}</p>
        </div>
    );
};

export default MainChat
