import { doc, setDoc, collection, query, where, limit, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const addUser = (id, username) => {
    const userRef = doc(db, "users", id);
    console.log("🚀 ~ file: users.js ~ line 5 ~ addUser ~ userRef", userRef);
    setDoc(userRef, {
        name: username,
        chatroom: null
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

const fetchUserDetails = async (id) => {
    const userRef = doc(db, "users", id);
    const docSnap = await getDoc(userRef);
    return docSnap.data();
}

export {
    addUser,
    fetchChatFromUser,
    fetchUserDetails
}