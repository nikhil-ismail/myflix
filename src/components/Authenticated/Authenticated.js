import React from "react";
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import Favourites from "../Favourites/Favourites";
import Friends from "../Friends/Friends";
import { Box } from "@chakra-ui/react";

const Authenticated = (props) => {
  return (
    <Box width="100%">
      <Navigation handleRouteChange={props.handleRouteChange} />
      {props.endpoint === "home" ? <Home /> : props.endpoint === "favourites" ? <Favourites /> : <Friends />}
    </Box>
  );
};

export default Authenticated;
