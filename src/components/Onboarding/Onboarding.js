import React, { useState } from "react";
import { auth } from '../../firebase-config';
import { db } from '../../firebase-config';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { Flex, Heading, Input, Button } from "@chakra-ui/react";

const Onboarding = (props) => {

  const [name, setName] = useState("");
  const [genres, setGenres] = useState("");
  const [actors, setActors] = useState("");

  const usersCollectionRef = collection(db, "users");
  const userEmail = auth.currentUser.email && auth.currentUser.email;

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
    <Flex alignItems="center" flexDirection="column" width="100%">
      <Heading fontSize="60px" color="#1BA098" pt="30px">MyFlix</Heading>
      <Flex flexDirection="column" mt="75px" pb="100%">
        <Heading textAlign="center" color="#1BA098" mb="30px">Complete Your Profile</Heading>
          <Input borderRadius="20px" mb="15px" width="500px" backgroundColor="#c4cfce" placeholder="Name" type="text" onChange={(event) => {setName(event.target.value)}} />
          <Input borderRadius="20px" mb="15px" width="500px" backgroundColor="#c4cfce" type="text" placeholder="What genres are you interested in?" onChange={(event) => {setGenres(event.target.value)}} />
          <Input borderRadius="20px" mb="15px" width="500px" backgroundColor="#c4cfce" type="text" placeholder="Who are your favourite actors/actresses?" onChange={(event) => {setActors(event.target.value)}} />
        <Button ml="150px" alignItems="center" mt="15px" width="200px" borderRadius="20px" backgroundColor="#c4cfce" onClick={handleOnboard}>Complete</Button>
      </Flex>
    </Flex>
  );
};

export default Onboarding;