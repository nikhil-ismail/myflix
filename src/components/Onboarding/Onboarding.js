import React, { useState } from "react";
import { auth } from '../../firebase-config';
import { db } from '../../firebase-config';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { Flex, Text, Heading, Input, Button } from "@chakra-ui/react";

const Onboarding = (props) => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [genres, setGenres] = useState("");
  const [actors, setActors] = useState("");

  const usersCollectionRef = collection(db, "users");
  const userEmail = auth.currentUser.email !== null ? auth.currentUser.email : localStorage.getItem("email");

  const handleOnboard = async () => {
    try {
        const data = await getDocs(usersCollectionRef);
        const toAdd = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const profile = toAdd.filter(user => user.email === email);
        const me = profile[0];
        console.log(profile);
        await updateDoc(doc(db, "users", me.id), { name: name, email: email, genres: genres, actors: actors, following: [] });
        props.successfulLogin();
    }
    catch (error) {
        console.log(error.message);
    }
  }
  
  return (
    <Flex>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Heading>COMPLETE YOUR PROFILE</Heading>
        <Flex flexDirection="column">
          <Text>Email</Text>
          <Input placeholder={userEmail} type="text" onChange={(event) => {setEmail(event.target.value)}} />
        </Flex>
        <Flex flexDirection="column">
          <Text>Name</Text>
          <Input type="text" onChange={(event) => {setName(event.target.value)}} />
        </Flex>
        <Flex flexDirection="column">
          <Text>What genres are you interested in?</Text>
          <Input type="text" placeholder="Drama, Comedy, etc." onChange={(event) => {setGenres(event.target.value)}} />
        </Flex>
        <Flex flexDirection="column">
          <Text>Who are your favourite actors/actresses?</Text>
          <Input type="text" placeholder="Brad Pitt, Jennifer Lawrence, etc." onChange={(event) => {setActors(event.target.value)}} />
        </Flex>
        <Button onClick={handleOnboard}>Complete</Button>
      </Flex>
    </Flex>
  );
};

export default Onboarding;