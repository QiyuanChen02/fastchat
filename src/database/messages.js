import { db } from "../firebase";
import { doc, addDoc, collection, serverTimestamp, query, orderBy, limit, onSnapshot } from "firebase/firestore";

const addMessage = (uid, chatroomId, message) => {
    const chatroom = doc(db, "chatrooms", chatroomId);
    const messagesRef = collection(chatroom, "messages");

    addDoc(messagesRef, {
        text: message,
        createdAt: serverTimestamp(),
        uid,
    });
}

const fetchMessagesFromChat = (chatroomId, setMessages) => {
    const chatroom = doc(db, "chatrooms", chatroomId);
    const messagesRef = collection(chatroom, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"), limit(10));
    const unsubscribe = onSnapshot(q, snapshot => {
        if (!snapshot.metadata.hasPendingWrites){
            const messageList = [];
            snapshot.forEach(doc => {
                messageList.unshift({id: doc.id, ...doc.data()});
            });
            console.log("🚀 ~ file: Mainchat.jsx ~ line 34 ~ useEffect ~ messageList", messageList);
            setMessages(messageList);
        }
    });

    return unsubscribe;
}

export {
    addMessage,
    fetchMessagesFromChat
}