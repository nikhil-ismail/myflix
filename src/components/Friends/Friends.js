import React, { useState, useEffect } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import Search from "../Search/Search";
import FriendCard from "../FriendCard/FriendCard";

const Friends = (props) => {

  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");

  const handleQueryChange = (text) => {
    setQuery(text);
  }

  const getUsers = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const toAdd = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(toAdd);
      console.log("------data-----", users);
    }
    catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Flex flexDirection="row">
      <Flex flexDirection="column">
        <Heading fontSize="26px" mb="25px" ml="100px">Follow Users</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="60px" backgroundColor="lightgray" flexDirection="column">
          {users.map((user, index) => {
            return (
                <FriendCard friend={user} key={index} />
            )
          })}
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Heading fontSize="26px" mb="25px" ml="100px">My Friends</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="60px" backgroundColor="lightgray" flexDirection="column">
          {users.map((user, index) => {
            return (
                <FriendCard friend={user} key={index} />
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Friends;