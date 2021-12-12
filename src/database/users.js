import { db, doc, setDoc } from "../firebase";

const addUser = (id, username) => {
    const usersRef = doc(db, "users", id);
    console.log("🚀 ~ file: users.js ~ line 5 ~ addUser ~ usersRef", usersRef)
    setDoc(usersRef, {
        //Change to correct name
        name: username
    });
}

export {
    addUser
}