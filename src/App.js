import { Navbar, Landing } from "./components/index.js";

import { GetUserContext } from "./contexts/AuthenticationContext.jsx";
import Login from "./authentication/Login.jsx";
import SignUp from "./authentication/Signup.jsx";
//Import something from firestore too

function App() {

  const user = GetUserContext();

  return (
    <>
      {user 
        ? <Navbar />
        : <>
            <Navbar />
            <Landing />
            <Login />
            <SignUp />
          </>
      }
    </>
  );
};

export default App;
