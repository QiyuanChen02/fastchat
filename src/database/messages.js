import { db } from "../firebase";
import { doc, addDoc, collection, serverTimestamp, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { getTime } from "../helpers/helperfunctions";

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

const fetchMessagesFromChat = (chatroomId, setMessages) => {
    const chatroom = doc(db, "chatrooms", chatroomId);
    const messagesRef = collection(chatroom, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"), limit(25));
    const unsubscribe = onSnapshot(q, snapshot => {
        if (!snapshot.metadata.hasPendingWrites){
            const messageList = [];
            snapshot.forEach(doc => {
                const data = {id: doc.id, ...doc.data()}
                data.createdAt = getTime(data.createdAt.toDate()); //change creation date to 00:00 format
                messageList.unshift(data);
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