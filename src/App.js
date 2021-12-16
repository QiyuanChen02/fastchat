import { Navbar, Landing, Info, Footer, MainChat } from "./components/index.js";
import Login from "./authentication/Login.jsx";
import SignUp from "./authentication/Signup.jsx";

import { GetUserContext } from "./contexts/AuthenticationContext.jsx";

function App() {

  const user = GetUserContext();
  return (
    <div className={`app`}>
      <Navbar />
      {user ? <MainChat /> : <LandingPage />}
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

export default App;
