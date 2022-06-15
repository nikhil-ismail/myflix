import React, { useState } from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { Flex, Text, Heading, Input, Button } from "@chakra-ui/react";

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Heading>LOGIN</Heading>
      <Flex>
        <Text>Email</Text>
        <Input type="email" onChange={(event) => {setEmail(event.target.value)}} />
      </Flex>
      <Flex>
        <Text>Password</Text>
        <Input type="password" onChange={(event) => {setPassword(event.target.value)}} />
      </Flex>
      <Button onClick={login}>Log In</Button>
      <Text cursor="pointer" onClick={() => props.handleRouteChange('signup')}>Not a user? Sign up now!</Text>
    </Flex>
  );
};

export default Login;
