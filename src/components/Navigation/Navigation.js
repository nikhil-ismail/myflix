import React from 'react';
import { auth } from '../../firebase-config';
import { signOut } from '@firebase/auth';
import { Flex, Heading, Divider } from "@chakra-ui/react";

const Navigation = (props) => {

  const logout = async () => {
    try {
      await signOut(auth);
      props.handleRouteChange('logout');
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
      <Flex flexDirection="column">
        <Flex flexDirection="row" pl="15px" pt="15px" pb="15px" mt="15px" mb="15px">
          <Heading padding="8px 15px 8px 15px" color="#1BA098" cursor="pointer" onClick={() => props.handleRouteChange('favourites')}>MyFlix</Heading>
          <Heading _hover={{ backgroundColor: "#1BA098", color: "black", padding:"8px 15px 8px 15px", borderRadius: "20px" }} padding="8px 15px 8px 15px" color="#1BA098" cursor="pointer" fontSize="26px" ml="20px" mt="7.5px" onClick={() => props.handleRouteChange('favourites')}>Home</Heading>
          <Heading _hover={{ backgroundColor: "#1BA098", color: "black", padding:"8px 15px 8px 15px", borderRadius: "20px" }} padding="8px 15px 8px 15px" color="#1BA098" cursor="pointer" fontSize="26px" ml="20px" mt="7.5px" onClick={() => props.handleRouteChange('home')}>Explore</Heading>
          <Heading _hover={{ backgroundColor: "#1BA098", color: "black", padding:"8px 15px 8px 15px", borderRadius: "20px" }} padding="8px 15px 8px 15px" color="#1BA098" cursor="pointer" fontSize="26px" ml="20px" mt="7.5px" onClick={() => props.handleRouteChange('friends')}>Friends</Heading>
          <Heading _hover={{ backgroundColor: "#1BA098", color: "black", padding:"8px 15px 8px 15px", borderRadius: "20px" }} padding="8px 15px 8px 15px" color="#1BA098" cursor="pointer" fontSize="26px" ml="700px" mt="7.5px" onClick={logout}>Log Out</Heading>
        </Flex>
        <Divider mb="40px" color="1BA098" />
      </Flex>
  );
}

export default Navigation;