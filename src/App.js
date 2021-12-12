import { useState } from "react";
import { Navbar, Landing, Footer } from "./components/index.js";

import { GetUserContext } from "./contexts/AuthenticationContext.jsx";
import Login from "./authentication/Login.jsx";
import SignUp from "./authentication/Signup.jsx";
//Import something from firestore too

function App() {

  const user = GetUserContext();

  const [theme, setTheme] = useState("Light");
  return (
    <div className={`page ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme}/>
      {user 
        ? <>
            <h1>You have logged in</h1>
          </>
        : <>
            <Landing />
            <Login />
            <SignUp />
          </>
      }
      <Footer />
    </div>
  );
};

export default App;
