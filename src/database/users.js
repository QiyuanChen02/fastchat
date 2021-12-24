import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const addUser = (id, username) => {
    const userRef = doc(db, "users", id);
    setDoc(userRef, {
        name: username,
        chatroom: null
    });
}

const getUserRef = (uid) => {
    return doc(db, "users", uid);
}

export {
    addUser,
    getUserRef
}