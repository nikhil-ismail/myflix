import React, { useState } from "react";
import { db, auth, signInWithGoogle } from "../../firebase-config";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { collection, getDocs } from 'firebase/firestore';
import { Flex, Text, Heading, Input, Button, Divider } from "@chakra-ui/react";
import "./Login.css";

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
    <Flex flexDirection="row" width="100%">
      <Flex width="55%" backgroundColor="white" pb="15%" alignItems="center" flexDirection="column">
        <Heading fontSize="60px" color="#1BA098" pt="30px">MyFlix</Heading>
        <Flex alignItems="center" flexDirection="column" pt="75px">
          <Heading fontSize="40px" mb="30px" color="#051622">Login to Your Account</Heading>
          <Divider width="100%" orientation="horizontal" />
          <Flex mt="30px" flexDirection="column">
            <Input placeholder="Email" width="500px" borderRadius="20px" backgroundColor="#c4cfce" type="email" onChange={(event) => {setEmail(event.target.value)}} />
          </Flex>
          <Flex mt="15px" mb="30px" flexDirection="column">
            <Input placeholder="Password" width="500px" borderRadius="20px" backgroundColor="#c4cfce" type="password" onChange={(event) => {setPassword(event.target.value)}} />
          </Flex>
          <Button mb="15px" backgroundColor="#1BA098" color="white" width="200px" borderRadius="20px" onClick={login}>Login</Button>
          <Text mb="15px">or</Text>
          <button type="button" class="login-with-google-btn" onClick={googleLogin}>Login with Google</button>
        </Flex>
      </Flex>
      <Flex alignItems="center" pt="230px" flexDirection="column" width="45%">
        <Heading color="#1BA098" mb="30px" fontSize="40px">New to MyFlix?</Heading>
        <Text textAlign="center" fontSize="20px" width="60%" mb="30px" color="#1BA098">Sign up now and browse a catalog of thousands of movies and tv shows with your friends!</Text>
        <Button width="200px" borderRadius="20px" backgroundColor="#1BA098" onClick={() => props.handleRouteChange('signup')}>Sign Up</Button>
      </Flex>
    </Flex>
  );
};

export default Login;
