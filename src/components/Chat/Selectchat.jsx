import { limit, query, collection, setDoc, doc, deleteDoc, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import React from 'react'
import { GetUserContext } from '../../contexts/AuthenticationContext';

function Selectchat() {

    const user = GetUserContext();

    const createChatroom = async (uid1, uid2) => {

        const chatroomsRef = collection(db, "chatrooms");
        const docRef = await addDoc(chatroomsRef, {
            members: [uid1, uid2]
        });
        const newChatId = docRef.id;
        const user1Ref = doc(db, "users", uid1);
        const user2Ref = doc(db, "users", uid2);

        //setUserDetails({
        //  ...userDetails,
        //  chatroom: newChatId
        //})
        setDoc(user1Ref, {
            chatroom: newChatId
        }, { merge: true });

        setDoc(user2Ref, {
            chatroom: newChatId
        }, { merge: true });
    }

    const findAChat = async () => {

        const awaitingusersRef = collection(db, "awaitingusers");
        const q = query(awaitingusersRef, limit(1));
        
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const otherUser = snapshot.docs[0];
            await createChatroom(user.uid, otherUser.id);
            deleteDoc(otherUser.ref);
        } else {
            setDoc(doc(db, "awaitingusers", user.uid), {});
        }

        // const unsubscribe = onSnapshot(q, snapshot => {
        //     console.log("AwaitingUsersSnapshot: ", snapshot);
        //     if (!snapshot.empty){
        //         alert("User found");
        //         createChatroom(user.uid, snapshot.docs[0].id);
        //         deleteDoc(doc(db, "awaitingusers", user.uid));
        //         unsubscribe();
        //     } else {
        //         alert("User not found");
        //         setDoc(doc(db, "awaitingusers", user.uid), {});
        //     }
        // });

    }

    return (
        <div>
            <button onClick={findAChat}>Find own chat</button>
        </div>
    )
}

export default Selectchat
