import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const addUser = (id, username) => {
    const usersRef = doc(db, "users", id);
    console.log("🚀 ~ file: users.js ~ line 5 ~ addUser ~ usersRef", usersRef);
    setDoc(usersRef, {
        name: username
    });
}

// const getUserChatroom = async (id) => {
//     const usersRef = doc(db, "users", id);
//     const usersSnap = await getDoc(usersRef);

//     if (usersSnap.exists()){
//         return usersSnap.data().chatroom;
//     } else {
//         console.log("The user doesn't exist :(");
//     }
// }

// //everytime the chatroom the user is connected to changes, we want 

// //onSnapshot(doc(db, "users", user.uid), doc => doc.data().chatroom)
// const q = query(collection(chatId, "messages"), orderBy("createdAt"), limit(25));
// onSnapshot(q, snapshot => {
//     const messages = [];
//     snapshot.forEach(doc => {
//         messages.push(doc.data());
//     });
// }

export {
    addUser
}