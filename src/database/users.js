import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const addUser = (id, username) => {
    const userRef = doc(db, "users", id);
    console.log("🚀 ~ file: users.js ~ line 5 ~ addUser ~ userRef", userRef);
    setDoc(userRef, {
        name: username,
        chatroom: "main"
    });
}

const getUserRef = (uid) => {
    return doc(db, "users", uid);
}

export {
    addUser,
    getUserRef
}