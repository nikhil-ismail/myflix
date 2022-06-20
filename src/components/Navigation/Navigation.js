import React from 'react';
import { auth } from '../../firebase-config';
import { signOut } from '@firebase/auth';
import { Flex, Heading } from "@chakra-ui/react";

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
      <Flex flexDirection="row" pl="30px" pt="20px" pb="20px" mb="30px" backgroundColor="#ff0015">
          <Heading cursor="pointer" onClick={() => props.handleRouteChange('favourites')}>MyFlix</Heading>
          <Heading cursor="pointer" fontSize="26px" ml="35px" mt="7.5px" onClick={() => props.handleRouteChange('home')}>Explore</Heading>
          <Heading cursor="pointer" fontSize="26px" ml="35px" mt="7.5px" onClick={() => props.handleRouteChange('friends')}>Friends</Heading>
          <Heading cursor="pointer" fontSize="26px" ml="900px" mt="7.5px" onClick={logout}>Log Out</Heading>
      </Flex>
  );
}

export default Navigation;