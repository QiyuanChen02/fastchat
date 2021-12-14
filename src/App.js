import { useState } from "react";

import { Navbar, Landing, Info, Footer, MainChat } from "./components/index.js";
import Login from "./authentication/Login.jsx";
import SignUp from "./authentication/Signup.jsx";

import { GetUserContext } from "./contexts/AuthenticationContext.jsx";

function App() {

  const user = GetUserContext();

  const [theme, setTheme] = useState("Light");
  return (
    <div className={`app ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme}/>
      {user 
        ? <>
            <MainChat />
          </>
        : <>
            <Landing />
            <Info />
            <Login />
            <SignUp />
          </>
      }
      <Footer />
    </div>
  );
};

export default App;
