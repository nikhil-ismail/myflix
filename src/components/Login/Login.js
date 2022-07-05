import React, { useState } from "react";
import { db, auth, signInWithGoogle } from "../../firebase-config";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { collection, getDocs } from 'firebase/firestore';
import { Flex, Text, Heading, Input, Button } from "@chakra-ui/react";

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usersCollectionRef = collection(db, "users");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      props.successfulLogin();
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const googleLogin = () => {
    signInWithGoogle().then(async (result) => {
      const mail = result.user.email;
      const data = await getDocs(usersCollectionRef);
      const toCheck = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const profile = toCheck.filter(user => user.email === mail);
      if (profile) {
        console.log(profile);
        props.successfulLogin();
      } else {
        console.log("Error logging in with google");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <Flex pt="30px" pl="30px" pb="100%" justifyContent="center" alignItems="center" flexDirection="column">
      <Heading color="#1BA098">LOGIN</Heading>
      <Flex flexDirection="column">
        <Text color="#1BA098">Email</Text>
        <Input backgroundColor="#718ea3" type="email" onChange={(event) => {setEmail(event.target.value)}} />
      </Flex>
      <Flex flexDirection="column">
        <Text color="#1BA098">Password</Text>
        <Input backgroundColor="#718ea3" type="password" onChange={(event) => {setPassword(event.target.value)}} />
      </Flex>
      <Button backgroundColor="#718ea3" mb="10px" mt="10px" onClick={googleLogin}>Log in with Google</Button>
      <Button backgroundColor="#718ea3" onClick={login}>Log In</Button>
      <Text color="#1BA098" cursor="pointer" onClick={() => props.handleRouteChange('signup')}>Not a user? Sign up now!</Text>
    </Flex>
  );
};

export default Login;
