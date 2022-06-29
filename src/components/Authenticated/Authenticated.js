import React from "react";
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import Favourites from "../Favourites/Favourites";
import Friends from "../Friends/Friends";
import FriendProfile from "../FriendProfile/FriendProfile";
import { Box } from "@chakra-ui/react";

const Authenticated = (props) => {
  return (
    <Box width="100%">
      <Navigation handleRouteChange={props.handleRouteChange} />
      {props.endpoint === "home" ? (
        <Home handleRouteChange={props.handleRouteChange} />
      ) : props.endpoint === "favourites" ? (
        <Favourites handleRouteChange={props.handleRouteChange} />
      ) : props.endpoint === "friends" ? (
        <Friends handleRouteChange={props.handleRouteChange} />
      ) : <FriendProfile profile={props.profile} />}
    </Box>
  );
};

export default Authenticated;
