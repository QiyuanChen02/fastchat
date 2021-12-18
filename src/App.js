import { Topbar, Landing, Info, Footer, MainChat, Selectchat } from "./components/index.js";
import Login from "./authentication/Login.jsx";
import SignUp from "./authentication/Signup.jsx";

import { GetUserContext } from "./contexts/AuthenticationContext.jsx";

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
  return (
    <>
      <MainChat />
      <Selectchat />
    </>
  )
}

export default App;
