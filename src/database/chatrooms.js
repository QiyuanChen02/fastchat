import { doc, updateDoc, collection, addDoc, arrayUnion, query, limit, deleteDoc, getDocs, arrayRemove, where } from "firebase/firestore";
import { db } from "../firebase";
import { addMessage } from "./messages";

//convert users chatroom to chatroomId
const setUserChatroom = async (uid, chatroomId) => {

    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            chatroom: chatroomId
        });
    } catch (e) {
        console.log(e);
    }
}

//adds a chatroom with that user as a memeber and returns the id of that chatroom
const createChatroom = async (uid, username) => {

    try {
        const chatroomsRef = collection(db, "chatrooms");
        const docRef = await addDoc(chatroomsRef, {
            members: [uid]
        });
        const newChatroomId = docRef.id;
        await setUserChatroom(uid, newChatroomId);
        addMessage(uid, newChatroomId, `${username} has created a new chat! Waiting for another person to join...`);
        return newChatroomId;
    } catch (e) {
        console.log(e);
    }
}

//Adds user to members array of chatroom and sets the user's chatroom to the chatroom id
const joinChatroom = async (uid, chatroomId, username) => {

    try {
        const chatroomRef = doc(db, "chatrooms", chatroomId);
        await updateDoc(chatroomRef, {
            members: arrayUnion(uid)
        });
        await setUserChatroom(uid, chatroomId);
        addMessage(uid, chatroomId, `${username} has joined the chat! Say hello...`);
    } catch (e) {
        console.log(e);
    }
}

// deletes the chatroom
// const deleteChatroom = async (chatroomId) => {
//     try {
//         const chatroomRef = doc(db, "chatrooms", chatroomId);
//         const messagesRef = collection(chatroomRef, "messages");
//         const messageSnapshots = query(messagesRef);
//         messageSnapshots.forEach(snapshot => {
//             deleteDoc(snapshot.ref);
//         });
//     } catch (e) {
//         console.log(e);
//     }
// }

//removes user from chatroom members, deletes the chatroom if there are no members and removes chatroom from awaiting chatrooms list if it's in it
const leaveChatroom = async (uid, chatroomId, username) => {
    
    try {

        await addMessage(uid, chatroomId, `${username} has left the chat... Click new chat to find another chat`);

        const chatroomRef = doc(db, "chatrooms", chatroomId);
        await updateDoc(chatroomRef, {
            members: arrayRemove(uid)
        });

        // const chatroomSnap = await getDoc(chatroomRef);
        // if (chatroomSnap.data().members.length === 0){
        //     deleteChatroom(chatroomId);
        // }

        const awaitingchatroomsRef = collection(db, "awaitingchatrooms");
        const q = query(awaitingchatroomsRef, where("chatroomId", "==", chatroomId), limit(1));
        const snapshot = await getDocs(q);
        if (snapshot.docs[0]){
            deleteDoc(doc(db, "awaitingchatrooms", snapshot.docs[0].id));
        }
    } catch (e) {
        console.log(e);
    }
    
}

//leaves previous chatroom, then joins a chatroom if it's in awaitingchatrooms, otherwise create a new chatroom
const findAChat = async (uid, chatroom, username) => {

    try {
        if (chatroom && chatroom !== "main") {
            await leaveChatroom(uid, chatroom, username);
        }
        const awaitingchatroomsRef = collection(db, "awaitingchatrooms");
        const q = query(awaitingchatroomsRef, limit(1));
        const snapshot = await getDocs(q);
    
        //If no awaiting chatroom, then add a chatroom, otherwise join the chatroom listed in awaiting chatrooms
        if (snapshot.empty) {
            const chatroomId = await createChatroom(uid, username);
            await addDoc(awaitingchatroomsRef, {
                chatroomId: chatroomId
            });
        } else {
            const requiredChatroom = snapshot.docs[0].data().chatroomId;
            await joinChatroom(uid, requiredChatroom, username);
            await deleteDoc(doc(db, "awaitingchatrooms", snapshot.docs[0].id));
        }
        
    } catch (e) {
        console.log(e);
    }
}

//returns user to the select chatroom screen
const returnToSelection = async (uid, chatroomId, username) => {

    try {
        if (chatroomId !== "main"){
            await leaveChatroom(uid, chatroomId, username);
        }
        await setUserChatroom(uid, null);
    } catch (e) {
        console.log(e);
    }
    
}

//returns user to the main chatroom
const goToMain = async (uid) => {
    try {
        await setUserChatroom(uid, "main");
    } catch (e) {
        console.log(e);
    }
    
}

export {
    findAChat,
    goToMain,
    returnToSelection
}