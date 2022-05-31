import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import Favourites from "../Favourites/Favourites";

const Authenticated = (props) => {
  return (
    <div>
      <Navigation
        handleLogout={props.handleLogout}
        handleHome={props.handleHome}
        handleFavourites={props.handleFavourites}
      />
      {props.endpoint === "home" ? <Home /> : <Favourites />}
    </div>
  );
};

export default Authenticated;
