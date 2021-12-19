import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const addUser = (id, username) => {
    const userRef = doc(db, "users", id);
    console.log("🚀 ~ file: users.js ~ line 5 ~ addUser ~ userRef", userRef);
    setDoc(userRef, {
        name: username,
        chatroom: "main"
    });
}

const userInfoListener = (uid, setUserState) => {
    const unsubscribe = onSnapshot(doc(db, "users", uid), doc => {
        setUserState(doc.data());
    });
    return unsubscribe;
}

export {
    addUser,
    userInfoListener
}