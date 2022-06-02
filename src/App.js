import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Authenticated from "./components/Authenticated/Authenticated";
import Signup from "./components/Signup/Signup";

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [endpoint, setEndpoint] = useState('home');

  const successfulLogin = () => {
    setAuthenticated(true);
    handleRouteChange('home');
  }

  const handleRouteChange = (route) => {
    if (route === 'logout') {
      setEndpoint('login');
      setAuthenticated(false);
    }
    else if (route === 'login') {
      setEndpoint('login');
    }
    else if (route === 'signup') {
      setEndpoint('signup');
    }
    else if (route === 'home') {
      setEndpoint('home');
    }
    else if (route === 'favourites') {
      setEndpoint('favourites');
    }
    else if (route === 'friends') {
      setEndpoint('friends');
    }
  }

  return (
    <div className="app-container">
      {authenticated === true ? (
        <Authenticated
          endpoint={endpoint}
          handleRouteChange={handleRouteChange}
        />
      ) : 
      endpoint === "login" ?
      (
        <Login successfulLogin={successfulLogin} handleRouteChange={handleRouteChange} />
      ) :
      (
        <Signup successfulLogin={successfulLogin} handleRouteChange={handleRouteChange} />
      )
      }
    </div>
  );
};

export default App;
