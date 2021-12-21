import { db } from "../firebase";
import { doc, addDoc, collection, serverTimestamp, query, orderBy, limit } from "firebase/firestore";

const addMessage = (uid, username, chatroomId, message) => {
    const chatroom = doc(db, "chatrooms", chatroomId);
    const messagesRef = collection(chatroom, "messages");

    addDoc(messagesRef, {
        text: message,
        createdAt: serverTimestamp(),
        uid,
        username,
    });
}

const getMessageQuery = (chatroomId) => {
    const chatroom = doc(db, "chatrooms", chatroomId);
    const messagesRef = collection(chatroom, "messages");
    return query(messagesRef, orderBy("createdAt", "desc"), limit(25));
}

export {
    addMessage,
    getMessageQuery
}