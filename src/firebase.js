import { initializeApp } from "firebase/app";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

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

export {
    firebase,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    auth
}