import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { Text, Heading, Flex, Spinner, Circle } from "@chakra-ui/react";
import ProfileTag from "../ProfileTag/ProfileTag";

const UserProfile = () => {

  const [update, setUpdate] = useState(false);
  const [meLoading, setMeLoading] = useState(true);
  const [me, setMe] = useState({});

  const userEmail = auth.currentUser.email;
  let userInitials = me.name && me.name.split(" ")[0][0].toUpperCase() + me.name.split(" ")[1][0].toUpperCase();
  const usersCollectionRef = collection(db, "users");
  let splitGenres = me.genres ? me.genres.split(" ") : [];
  let splitActors = me.actors ? me.actors.split(" ") : [];
  let fullActors = [];

  for (let i = 0; i < splitActors.length - 1; i = i + 2) {
      let data = splitActors.slice(i, i + 2).join(" ");
      data = data.split(" ");
      let first = data[0][0].toUpperCase() + data[0].substring(1, data[0].length) + " ";
      let last = data[1][0].toUpperCase() + data[1].substring(1, data[1].length);
      fullActors.push(first.concat(last));
  }

  const getMe = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const toAdd = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const profile = toAdd.filter(user => user.email === userEmail);
      setMe(profile[0]);
      userInitials = profile[0].name.split(" ")[0][0] + profile[0].name.split(" ")[1][0];
      setMeLoading(false);
    }
    catch(err) {
      console.log(err);
    }
  };

  const handleUpdate = () => {
    setUpdate(!update);
  }

  useEffect(() => {
    getMe();
  }, [update]);

  return (
    <Flex flexDirection="column">
      <Heading color="#1BA098" fontSize="26px" mb="25px">My Profile</Heading>
      <Flex width="275px" minWidth="250px" flexDirection="column">
        <Flex borderRadius="10px" padding="20px" backgroundColor="#c4cfce" flexDirection="column">
            {meLoading ? <Spinner /> :
            <Flex flexDirection="column">
                <Flex flexDirection="row">
                    <Circle size='50px' bg='#1BA098' color="#051622">{userInitials}</Circle>
                    <Text fontSize="20px" fontWeight="bold" pr="15px" mt="10px" ml="10px" color="#051622">{me.name}</Text>
                    <Flex mt="8px">
                    </Flex>
                </Flex>
                <Flex flexDirection="column" flexWrap="wrap" width="100%">
                    <Text mt="20px" mr="15px" fontWeight="bold">Favourite Genres</Text>
                    {splitGenres && splitGenres.map((genre, index) => {
                    return (
                        <ProfileTag genres={true} key={index} value={genre} />
                    )
                    })}
                </Flex>
                <Flex flexDirection="column" flexWrap="wrap" width="100%">
                    <Text mt="20px" mr="15px" fontWeight="bold">Favourite Actors</Text>
                    {fullActors && fullActors.map((actor, index) => {
                    return (
                        <ProfileTag key={index} value={actor} />
                    )
                    })}
                </Flex>
            </Flex>
            }
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserProfile;