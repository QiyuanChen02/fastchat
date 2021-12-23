import { db } from "../firebase";
import { doc, addDoc, collection, query, orderBy, limit } from "firebase/firestore";

const addMessage = async (uid, chatroomId, message, username = "") => {
    const chatroom = doc(db, "chatrooms", chatroomId);
    const messagesRef = collection(chatroom, "messages");

    await addDoc(messagesRef, {
        text: message,
        createdAt: Date.now(),
        uid,
        username,
    });
}

const getMessageQuery = (chatroomId) => {
    const chatroomRef = doc(db, "chatrooms", chatroomId);
    const messagesRef = collection(chatroomRef, "messages");
    return query(messagesRef, orderBy("createdAt", "asc"), limit(25));
}

export {
    addMessage,
    getMessageQuery
}