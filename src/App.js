import { Navbar, Main } from "./components/index.js";

import { initializeApp } from "firebase/app";
import UserProvider from "./authentication/AuthenticationContext.jsx";
import LoginModalProvider, { GetLoginModalContext } from "./authentication/LoginModalContext.jsx";
import SignupModalProvider from "./authentication/SignupModalContext.jsx";
import Login from "./authentication/Login.jsx";
//Import something from firestore too

const firebase = initializeApp({
  apiKey: "AIzaSyACBQxVSK5k4yt1sPDcy0ZAeXASDgmR0_A",
  authDomain: "qchen-chat.firebaseapp.com",
  projectId: "qchen-chat",
  storageBucket: "qchen-chat.appspot.com",
  messagingSenderId: "948407960054",
  appId: "1:948407960054:web:1f0dcdd0ccf31741da07d7",
  measurementId: "G-42XSYPX1V3"
});
//const firestore = getFirestore();

function App() {

  return (
    <LoginModalProvider>
      <SignupModalProvider>
        <UserProvider>
          <Navbar />
          <Main />
          <Login />
        </UserProvider>
      </SignupModalProvider>
    </LoginModalProvider>
  )
}

export default App;
