import React, { useState, useEffect } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { collection, getDocs, updateDoc, doc, arrayUnion, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import FriendCard from "../FriendCard/FriendCard";

/* BUGS
- app breaks when you have no friends
- logic breaks when there are no users left to follow
- can't update following array (syntax error)
*/

const Friends = (props) => {

  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [me, setMe] = useState({});
  const [update, setUpdate] = useState(false);

  const userEmail = auth.currentUser.email;
  let userId = "";
  const usersCollectionRef = collection(db, "users");
  //const userRef = doc(db, "cities", userId);


  const getUsers = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const toAdd = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const profile = toAdd.filter(user => user.email === userEmail);
      setMe(profile[0]);
      userId = profile[0].id;
      const allUsers = profile[0].following.length !== 0 && toAdd.filter(user => profile[0].following.find(friend => friend !== user.email && user.email !== userEmail));
      setUsers(allUsers);
      const amigos = profile[0].following.length !== 0 && toAdd.filter(user => profile[0].following.find(friend => friend === user.email));
      setFriends(amigos);
    }
    catch(err) {
      console.log(err);
    }
  };

  const handleFollow =  async (user) => {
    console.log("follow", user);
    try {
      //await updateDoc(userRef, {following: arrayUnion(user.email)});
      setUpdate(!update);
    }
    catch(err) {
        console.log(err);
    }
  }

  const handleUnfollow = async (user) => {
    console.log("unfollow", user);
    setUpdate(!update);
  }

  useEffect(() => {
    getUsers();
  }, [update]);

  return (
    <Flex flexDirection="row">
      <Flex flexDirection="column">
        <Heading fontSize="26px" mb="25px" ml="100px">My Profile</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="60px" backgroundColor="lightgray" flexDirection="column">
          <Flex mb="10px" borderRadius="10px" padding="25px" backgroundColor="white" flexDirection="column">
              <Text>{me.name}</Text>
              <Text>{me.genres}</Text>
              <Text>{me.actors}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Heading fontSize="26px" mb="25px" ml="100px">Follow Users</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="60px" backgroundColor="lightgray" flexDirection="column">
          {users.length === 0 ? (
            <Text mt="25px" mb="25px">You have follwed all users!</Text>
          ) : 
            (
            users.map((user, index) => {
              return (
                  <FriendCard handleFollow={handleFollow} handleUnfollow={handleUnfollow} following={false} friend={user} key={index} />
              )
            })
          )}
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Heading fontSize="26px" mb="25px" ml="100px">My Friends</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="60px" backgroundColor="lightgray" flexDirection="column">
          {friends.length === 0 ? (
            <Text mt="25px" mb="25px">You have not followed any friends yet!</Text>
          ) : 
            (
            friends.map((friend, index) => {
              return (
                  <FriendCard handleFollow={handleFollow} handleUnfollow={handleUnfollow} following={true} friend={friend} key={index} />
              )
            })
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Friends;