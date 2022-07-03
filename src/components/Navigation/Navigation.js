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
        <Flex flexDirection="row" pl="30px" pt="20px" pb="20px" mt="15px" mb="15px" backgroundColor="#051622">
          <Heading color="#1BA098" cursor="pointer" onClick={() => props.handleRouteChange('favourites')}>MyFlix</Heading>
          <Heading color="#1BA098" cursor="pointer" fontSize="26px" ml="35px" mt="7.5px" onClick={() => props.handleRouteChange('home')}>Explore</Heading>
          <Heading color="#1BA098" cursor="pointer" fontSize="26px" ml="35px" mt="7.5px" onClick={() => props.handleRouteChange('friends')}>Friends</Heading>
          <Heading color="#1BA098" cursor="pointer" fontSize="26px" ml="900px" mt="7.5px" onClick={logout}>Log Out</Heading>
        </Flex>
        <Divider mb="40px" color="1BA098" />
      </Flex>
  );
}

export default Navigation;