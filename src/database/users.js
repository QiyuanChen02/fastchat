import { db, doc, setDoc } from "../firebase";

const addUser = (id) => {
    const usersRef = doc(db, "users", id);
    console.log("🚀 ~ file: users.js ~ line 5 ~ addUser ~ usersRef", usersRef)
    setDoc(usersRef, {
        name: "BOB"
    });
}

export {
    addUser
}