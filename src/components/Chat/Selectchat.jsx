import { limit, query, collection, doc, deleteDoc, addDoc, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
import React from 'react'
import { GetUserContext } from '../../contexts/AuthenticationContext';

function Selectchat() {

    const user = GetUserContext();

    const setUserChatroom = async (uid, chatroomId) => {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            chatroom: chatroomId
        });
    }

    const createChatroom = async (uid) => {

        const chatroomsRef = collection(db, "chatrooms");
        const docRef = await addDoc(chatroomsRef, {
            members: [uid]
        });
        const newChatroomId = docRef.id;
        setUserChatroom(uid, newChatroomId);
        return newChatroomId;
    }

    const joinChatroom = async (uid, chatroomId) => {

        const chatroomRef = doc(db, "chatrooms", chatroomId);
        await updateDoc(chatroomRef, {
            members: arrayUnion(uid)
        });
        await setUserChatroom(uid, chatroomId);
    }

    const findAChat = async () => {

        const awaitingchatroomsRef = collection(db, "awaitingchatrooms");
        const q = query(awaitingchatroomsRef, limit(1));
        
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            const chatroomId = await createChatroom(user.uid);
            addDoc(awaitingchatroomsRef, {
                chatroomId: chatroomId
            });
        } else {
            const requiredChatroom = snapshot.docs[0].data().chatroomId;
            await joinChatroom(user.uid, requiredChatroom);
            await deleteDoc(doc(db, "awaitingchatrooms", snapshot.docs[0].id));
        }
    }

    return (
        <div>
            <button onClick={findAChat}>Find own chat</button>
        </div>
    )
}

export default Selectchat
