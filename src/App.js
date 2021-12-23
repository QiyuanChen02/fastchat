import { Landing, MainChat, Selectchat } from "./components/index.js";
import Login from "./authentication/Login.jsx";
import SignUp from "./authentication/Signup.jsx";
import { GetUserContext } from "./contexts/AuthenticationContext.jsx";
import { useDocumentData } from "react-firebase-hooks/firestore"; 
import { getUserRef } from "./database/users";

function App() {

  const user = GetUserContext();
  return (
    <div className="app">
      {user ? <ChatPage user={user}/> : <LandingPage />}
    </div>
  );
};

function LandingPage() {
  return (
    <>
      <Landing />
      <Login />
      <SignUp />
    </>
  );
};

function ChatPage({ user }) {

  const userRef = getUserRef(user.uid);
  const [userState, loading] = useDocumentData(userRef, { idField: "uid" });

  if (!loading){
    return (
      <>
        {userState.chatroom ? <MainChat {...userState} /> : <Selectchat {...userState} />}
      </>
    )
  } else {
    return null;
  }
}

export default App;
