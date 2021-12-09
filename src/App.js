import { Navbar, Main } from "./components/index.js";

import UserProvider from "./authentication/AuthenticationContext.jsx";
import LoginModalProvider from "./authentication/LoginModalContext.jsx";
import SignupModalProvider from "./authentication/SignupModalContext.jsx";
import Login from "./authentication/Login.jsx";
import SignUp from "./authentication/Signup.jsx";
//Import something from firestore too

function App() {

  return (
    <LoginModalProvider>
      <SignupModalProvider>
        <UserProvider>
          <Navbar />
          <Main />
          <Login />
          <SignUp />
        </UserProvider>
      </SignupModalProvider>
    </LoginModalProvider>
  )
}

export default App;
