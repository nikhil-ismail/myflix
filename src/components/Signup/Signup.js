import React, { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth, signInWithGoogle } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { Flex, Text, Heading, Input, Button, Divider } from "@chakra-ui/react";
import "./Signup.css";

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
    <Flex flexDirection="row" width="100%">
      <Flex width="55%" backgroundColor="white" pb="15%" alignItems="center" flexDirection="column">
        <Heading fontSize="60px" color="#1BA098" pt="30px">MyFlix</Heading>
        <Flex alignItems="center" flexDirection="column" pt="75px">
          <Heading fontSize="40px" mb="30px" color="#051622">Create Your Account</Heading>
          <Divider width="100%" orientation="horizontal" />
          <Flex mt="30px" flexDirection="column">
            <Input placeholder="Email" width="500px" borderRadius="20px" backgroundColor="#c4cfce" type="email" onChange={(event) => {setEmail(event.target.value)}} />
          </Flex>
          <Flex mt="15px" mb="30px" flexDirection="column">
            <Input placeholder="Password" width="500px" borderRadius="20px" backgroundColor="#c4cfce" type="password" onChange={(event) => {setPassword(event.target.value)}} />
          </Flex>
          <Button mb="15px" backgroundColor="#1BA098" color="white" width="200px" borderRadius="20px" onClick={register}>Sign Up</Button>
          <Text mb="15px">or</Text>
          <button type="button" class="signup-with-google-btn" onClick={googleRegister}>Signup with Google</button>
        </Flex>
      </Flex>
      <Flex alignItems="center" pt="230px" flexDirection="column" width="45%">
        <Heading color="#1BA098" mb="30px" fontSize="40px">Already use MyFlix?</Heading>
        <Text textAlign="center" fontSize="20px" width="60%" mb="30px" color="#1BA098">Login now and browse a catalog of thousands of movies and tv shows with your friends!</Text>
        <Button width="200px" borderRadius="20px" backgroundColor="#1BA098" onClick={() => props.handleRouteChange('login')}>Login</Button>
      </Flex>
    </Flex>
  );
};

export default Signup;