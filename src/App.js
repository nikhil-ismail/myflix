import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Authenticated from "./components/Authenticated/Authenticated";
import Signup from "./components/Signup/Signup";
import { Flex } from "@chakra-ui/react";
import Onboarding from "./components/Onboarding/Onboarding";

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [endpoint, setEndpoint] = useState('home');
  const [profie, setProfile] = useState({});

  const successfulLogin = () => {
    setAuthenticated(true);
    handleRouteChange('favourites');
  }

  const handleRouteChange = (route, user = {}) => {
    if (route === 'logout') {
      setAuthenticated(false);
      setEndpoint('login');
    }
    else if (route === 'login') {
      setEndpoint('login');
    }
    else if (route === 'signup') {
      setEndpoint('signup');
    }
    else if (route === 'onboarding') {
      setEndpoint('onboarding');
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
    else if (route === 'friendProfile') {
      setEndpoint('friendProfile');
      setProfile(user);
    }
  }

  return (
    <Flex className="app-container">
      {authenticated === true ? (
        <Authenticated
          endpoint={endpoint}
          profile={profie}
          handleRouteChange={handleRouteChange}
        />
      ) : 
      endpoint === "login" ?
      (
        <Login successfulLogin={successfulLogin} handleRouteChange={handleRouteChange} />
      ) :
      endpoint === "onboarding" ? 
      (
        <Onboarding successfulLogin={successfulLogin} handleRouteChange={handleRouteChange} />
      ) :
      (
        <Signup successfulLogin={successfulLogin} handleRouteChange={handleRouteChange} />
      )
      }
    </Flex>
  );
};

export default App;
