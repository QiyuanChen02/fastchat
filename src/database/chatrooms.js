import { doc, updateDoc, collection, addDoc, arrayUnion, query, limit, deleteDoc, getDocs, arrayRemove, getDoc, where } from "firebase/firestore";
import { db } from "../firebase";


//convert users chatroom to chatroomId
const setUserChatroom = async (uid, chatroomId) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        chatroom: chatroomId
    });
}

//adds a chatroom with that user as a memeber and returns the id of that chatroom
const createChatroom = async (uid) => {

    const chatroomsRef = collection(db, "chatrooms");
    const docRef = await addDoc(chatroomsRef, {
        members: [uid]
    });
    const newChatroomId = docRef.id;
    await setUserChatroom(uid, newChatroomId);
    return newChatroomId;
}

//Adds user to members array of chatroom and sets the user's chatroom to the chatroom id
const joinChatroom = async (uid, chatroomId) => {

    const chatroomRef = doc(db, "chatrooms", chatroomId);
    await updateDoc(chatroomRef, {
        members: arrayUnion(uid)
    });
    await setUserChatroom(uid, chatroomId);
}

//deletes the chatroom
const deleteChatroom = async (chatroomId) => {
    const chatroomRef = doc(db, "chatrooms", chatroomId);
    await deleteDoc(chatroomRef);

    // const messagesRef = collection(chatroomRef, "messages");
    // const messageSnapshots = query(messagesRef);
    // messageSnapshots.forEach(snapshot => {
    //     deleteDoc(snapshot.ref);
    // });
}

//removes user from chatroom members, deletes the chatroom if there are no members and removes chatroom from awaiting chatrooms list if it's in it
const leaveChatroom = async (uid, chatroomId) => {
    
    const chatroomRef = doc(db, "chatrooms", chatroomId);
    await updateDoc(chatroomRef, {
        members: arrayRemove(uid)
    });

    const chatroomSnap = await getDoc(chatroomRef);
    if (chatroomSnap.data().members.length === 0){
        deleteChatroom(chatroomId);
    }

    const awaitingchatroomsRef = collection(db, "awaitingchatrooms");
    const q = query(awaitingchatroomsRef, where("chatroomId", "==", chatroomId));
    const snapshot = await getDocs(q);
    if (snapshot.docs[0]){
        deleteDoc(doc(db, "awaitingchatrooms", snapshot.docs[0].id));
    }
}

//leaves previous chatroom, then joins a chatroom if it's in awaitingchatrooms, otherwise create a new chatroom
const findAChat = async (uid, chatroom) => {

    if (chatroom !== "main") {
        leaveChatroom(uid, chatroom);
    }
    const awaitingchatroomsRef = collection(db, "awaitingchatrooms");
    const q = query(awaitingchatroomsRef, limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        const chatroomId = await createChatroom(uid);
        await addDoc(awaitingchatroomsRef, {
            chatroomId: chatroomId
        });
    } else {
        const requiredChatroom = snapshot.docs[0].data().chatroomId;
        await joinChatroom(uid, requiredChatroom);
        await deleteDoc(doc(db, "awaitingchatrooms", snapshot.docs[0].id));
    }
}

const goToMain = async (uid) => {
    await setUserChatroom(uid, "main");
}

//returns user to the main chatroom
const returnToSelection = async (uid, chatroomId) => {

    if (chatroomId !== "main"){
        await leaveChatroom(uid, chatroomId);
    }
    await setUserChatroom(uid, null);
}

export {
    findAChat,
    goToMain,
    returnToSelection
}