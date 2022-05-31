import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Favourites from "./components/Favourites/Favourites";
import Login from "./components/Login/Login";
import Authenticated from "./components/Authenticated/Authenticated";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const App = () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC1FTCmmeDCrn4w01VdDhNByElVYRuhQWI",
    authDomain: "movie-rank-fe1d9.firebaseapp.com",
    projectId: "movie-rank-fe1d9",
    storageBucket: "movie-rank-fe1d9.appspot.com",
    messagingSenderId: "194207186638",
    appId: "1:194207186638:web:19126a585d384682731a9f",
    measurementId: "G-LFSCTFCWDS",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const [authenticated, setAuthenticated] = useState(true);
  const [endpoint, setEndpoint] = useState("home");

  const handleAuthenticate = () => {
    setAuthenticated(true);
  }

  const handleLogout = () => {
    setAuthenticated(false);
  };

  const handleHome = () => {
    setEndpoint("home");
  };

  const handleFavourites = () => {
    setEndpoint("favourites");
  };

  return (
    <div className="app-container">
      {authenticated ? (
        <Authenticated
          endpoint={endpoint}
          handleLogout={handleLogout}
          handleHome={handleHome}
          handleFavourites={handleFavourites}
        />
      ) : (
        <Login handleAuthenticate={handleAuthenticate} />
      )}
    </div>
  );
};

export default App;
