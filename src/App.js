import { Topbar, Landing, Info, Footer, MainChat, Selectchat } from "./components/index.js";
import Login from "./authentication/Login.jsx";
import SignUp from "./authentication/Signup.jsx";
import { GetUserContext } from "./contexts/AuthenticationContext.jsx";
import { useDocumentData } from "react-firebase-hooks/firestore"; 
import { getUserRef } from "./database/users";

function App() {

  const user = GetUserContext();
  return (
    <div className={`app`}>
      <Topbar />
      {user ? <ChatPage user={user}/> : <LandingPage />}
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

function ChatPage({ user }) {

  const userRef = getUserRef(user.uid);
  const [userState, loading] = useDocumentData(userRef, { idField: "id" });

  if (!loading){
    return (
      <>
        <MainChat {...userState} />
        <Selectchat {...userState}/>
      </>
    )
  } else {
    return null;
  }
}

export default App;
