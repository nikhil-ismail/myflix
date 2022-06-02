import React from "react";
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import Favourites from "../Favourites/Favourites";
import Friends from "../Friends/Friends";

const Authenticated = (props) => {
  return (
    <div>
      <Navigation handleRouteChange={props.handleRouteChange} />
      {props.endpoint === "home" ? <Home /> : props.endpoint === "favourites" ? <Favourites /> : <Friends />}
    </div>
  );
};

export default Authenticated;
