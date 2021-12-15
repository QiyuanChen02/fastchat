import { doc, setDoc, collection, query, where, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const addUser = (id, username) => {
    const usersRef = doc(db, "users", id);
    console.log("🚀 ~ file: users.js ~ line 5 ~ addUser ~ usersRef", usersRef);
    setDoc(usersRef, {
        name: username
    });
}

const fetchChatFromUser = (uid, setChatroomId) => {
    const chatroomRef = collection(db, "chatrooms");
    const q = query(chatroomRef, where("members", "array-contains", uid), limit(1));
    
    const unsubscribe = onSnapshot(q, snapshot => {
        snapshot.forEach(doc => setChatroomId(doc.id));
    });

    return unsubscribe;
}   

export {
    addUser,
    fetchChatFromUser
}