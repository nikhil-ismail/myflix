import React, { useState } from "react";
import { auth } from '../../firebase-config';
import { db } from '../../firebase-config';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { Flex, Text, Heading, Input, Button } from "@chakra-ui/react";

const Onboarding = (props) => {

  const [name, setName] = useState("");
  const [genres, setGenres] = useState("");
  const [actors, setActors] = useState("");

  const usersCollectionRef = collection(db, "users");
  const userEmail = auth.currentUser.email && auth.currentUser.email;
  const userName = auth.currentUser.displayName && auth.currentUser.displayName;

  const handleOnboard = async () => {
    try {
        const data = await getDocs(usersCollectionRef);
        const toAdd = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const profile = toAdd.filter(user => user.email === userEmail);
        const me = profile[0];
        await updateDoc(doc(db, "users", me.id), { name: name, email: userEmail, genres: genres, actors: actors, following: [] });
        props.successfulLogin();
    }
    catch (error) {
        console.log(error.message);
    }
  }
  
  return (
    <Flex>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Heading color="#1BA098">COMPLETE YOUR PROFILE</Heading>
        <Flex flexDirection="column">
          <Text color="#1BA098">Name</Text>
          <Input backgroundColor="#DEB992" placeholder={userName} type="text" onChange={(event) => {setName(event.target.value)}} />
        </Flex>
        <Flex flexDirection="column">
          <Text color="#1BA098">What genres are you interested in?</Text>
          <Input backgroundColor="#DEB992" type="text" placeholder="Drama, Comedy, etc." onChange={(event) => {setGenres(event.target.value)}} />
        </Flex>
        <Flex flexDirection="column">
          <Text color="#1BA098">Who are your favourite actors/actresses?</Text>
          <Input backgroundColor="#DEB992" type="text" placeholder="Brad Pitt, Jennifer Lawrence, etc." onChange={(event) => {setActors(event.target.value)}} />
        </Flex>
        <Button mt="15px" backgroundColor="#DEB992" onClick={handleOnboard}>Complete</Button>
      </Flex>
    </Flex>
  );
};

export default Onboarding;