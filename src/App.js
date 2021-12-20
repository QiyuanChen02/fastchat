import { Topbar, Landing, Info, Footer, MainChat, Selectchat } from "./components/index.js";
import Login from "./authentication/Login.jsx";
import SignUp from "./authentication/Signup.jsx";

import { GetUserContext } from "./contexts/AuthenticationContext.jsx";
import { useState, useEffect } from "react";
import { userInfoListener } from "./database/users.js";

function App() {

  const user = GetUserContext();
  return (
    <div className={`app`}>
      <Topbar />
      {user ? <ChatPage /> : <LandingPage />}
      <Footer />
    </div>
  );
};

function LandingPage() {
  return (
    <>
      <Landing />
      <Info />
      <Login />
      <SignUp />
    </>
  );
};

function ChatPage() {

  const user = GetUserContext();
  const [userState, setUserState] = useState({
    name: "",
    chatroom: "main"
  }); //maybe change all from null to main for nicer code

  useEffect(() => {
    const unsubscribe = userInfoListener(user.uid, setUserState);
    return () => unsubscribe();
  }, [user.uid]);

  return (
    <>
      <MainChat {...userState} />
      <Selectchat />
    </>
  )
}

export default App;
