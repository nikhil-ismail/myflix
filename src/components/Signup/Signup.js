import React, { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth, signInWithGoogle } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { Flex, Text, Heading, Input, Button } from "@chakra-ui/react";

const Signup = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usersCollectionRef = collection(db, "users");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(usersCollectionRef, { name: "", email: email, genres: "", actors: "", following: [] });
      console.log(user);
      props.handleRouteChange('onboarding');
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const googleRegister = async () => {
    try {
      signInWithGoogle();
      await addDoc(usersCollectionRef, { name: "", email: localStorage.getItem("email"), genres: "", actors: "", following: [] });
      props.handleRouteChange('onboarding');
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
          <Text>Email</Text>
          <Input type="email" onChange={(event) => {setEmail(event.target.value)}} />
        </Flex>
        <Flex flexDirection="column">
          <Text>Password</Text>
          <Input type="password" onChange={(event) => {setPassword(event.target.value)}} />
        </Flex>
        <Button mb="10px" mt="10px" onClick={googleRegister}>Sign up with Google</Button>
        <Button onClick={register}>Sign Up</Button>
        <Text cursor="pointer" onClick={() => props.handleRouteChange('login')}>Already a user? Login here!</Text>
      </Flex>
    </Flex>
  );
};

export default Signup;