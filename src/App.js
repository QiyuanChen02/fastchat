import React, { useState, useEffect } from "react";
import './dist/Main.css';

import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

firebase.initializeApp({
  apiKey: "AIzaSyACBQxVSK5k4yt1sPDcy0ZAeXASDgmR0_A",
  authDomain: "qchen-chat.firebaseapp.com",
  projectId: "qchen-chat",
  storageBucket: "qchen-chat.appspot.com",
  messagingSenderId: "948407960054",
  appId: "1:948407960054:web:1f0dcdd0ccf31741da07d7",
  measurementId: "G-42XSYPX1V3"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Signed in");
  } else {
    console.log("Signed out");
  }
})

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => setCurrentUser(user));
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      setError(e.message);
    }
    setEmail("");
    setPassword("");
  }

  const login = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password); 
    } catch (e) {
      setError(e.message);
    }
    setEmail("");
    setPassword("");
  }

  return (
    <div className="App">
      <form onSubmit={signUp}>
        <label for="email">Email: </label>
        <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label for="password">Password: </label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        <p>{error}</p>
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={login}>
        <label for="email">Email: </label>
        <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label for="password">Password: </label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        <p>{error}</p>
        <button type="submit">Submit</button>
      </form>

      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  )
}

export default App;
