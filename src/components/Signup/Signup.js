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

  const googleRegister = () => {
    signInWithGoogle().then(async (result) => {
      const name = result.user.displayName;
      const mail = result.user.email;
      await addDoc(usersCollectionRef, { name: name, email: mail, genres: "", actors: "", following: [] });
      props.handleRouteChange('onboarding');
    })
    .catch((error) => {
      console.log(error);
    });
  }
 
  return (
    <Flex pl="30px" pt="30px" pb="100%">
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Heading color="#1BA098">SIGNUP</Heading>
        <Flex flexDirection="column">
          <Text color="#1BA098">Email</Text>
          <Input backgroundColor="#DEB992" type="email" onChange={(event) => {setEmail(event.target.value)}} />
        </Flex>
        <Flex flexDirection="column">
          <Text color="#1BA098">Password</Text>
          <Input backgroundColor="#DEB992" type="password" onChange={(event) => {setPassword(event.target.value)}} />
        </Flex>
        <Button backgroundColor="#DEB992" mb="10px" mt="10px" onClick={googleRegister}>Sign up with Google</Button>
        <Button backgroundColor="#DEB992" onClick={register}>Sign Up</Button>
        <Text color="#1BA098" cursor="pointer" onClick={() => props.handleRouteChange('login')}>Already a user? Login here!</Text>
      </Flex>
    </Flex>
  );
};

export default Signup;