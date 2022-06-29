import React, { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { db } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { Flex, Text, Heading, Input, Button } from "@chakra-ui/react";

const Signup = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [genres, setGenres] = useState("");
  const [actors, setActors] = useState("");

  const usersCollectionRef = collection(db, "users");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(usersCollectionRef, { name: name, email: email, genres: genres, actors: actors, following: [] });
      console.log(user);
      props.successfulLogin();
    }
    catch (error) {
      console.log(error.message);
    }
  }
 
  
  return (
    <Flex>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Heading>SIGNUP</Heading>
        <Flex flexDirection="column">
          <Text>Name</Text>
          <Input type="text" onChange={(event) => {setName(event.target.value)}} />
        </Flex>
        <Flex flexDirection="column">
          <Text>Email</Text>
          <Input type="email" onChange={(event) => {setEmail(event.target.value)}} />
        </Flex>
        <Flex flexDirection="column">
          <Text>Password</Text>
          <Input type="password" onChange={(event) => {setPassword(event.target.value)}} />
        </Flex>
        <Flex flexDirection="column">
          <Text>What genres are you interested in?</Text>
          <Input type="text" placeholder="Drama, Comedy, etc." onChange={(event) => {setGenres(event.target.value)}} />
        </Flex>
        <Flex flexDirection="column">
          <Text>Who are your favourite actors/actresses?</Text>
          <Input type="text" placeholder="Brad Pitt, Jennifer Lawrence, etc." onChange={(event) => {setActors(event.target.value)}} />
        </Flex>
        <Button onClick={register}>Sign Up</Button>
        <Text cursor="pointer" onClick={() => props.handleRouteChange('login')}>Already a user? Login here!</Text>
      </Flex>
    </Flex>
  );
};

export default Signup;
