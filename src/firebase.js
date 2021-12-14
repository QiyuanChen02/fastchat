import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebase = initializeApp({
    apiKey: "AIzaSyACBQxVSK5k4yt1sPDcy0ZAeXASDgmR0_A",
    authDomain: "qchen-chat.firebaseapp.com",
    projectId: "qchen-chat",
    storageBucket: "qchen-chat.appspot.com",
    messagingSenderId: "948407960054",
    appId: "1:948407960054:web:1f0dcdd0ccf31741da07d7",
    measurementId: "G-42XSYPX1V3"
});

const auth = getAuth();
const db = getFirestore();

export {
    firebase,
    auth,
    db
}