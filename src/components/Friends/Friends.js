import React, { useState, useEffect } from "react";
import { Flex, Heading, Text, Circle, Spinner } from "@chakra-ui/react";
import { collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import FriendCard from "../FriendCard/FriendCard";

const Friends = (props) => {

  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [me, setMe] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  let userInitials = me.name && me.name.split(" ")[0][0] + me.name.split(" ")[1][0];
  const userEmail = auth.currentUser.email;
  let userId = "";
  const usersCollectionRef = collection(db, "users");

  const getUsers = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const toAdd = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const profile = toAdd.filter(user => user.email === userEmail);
      setMe(profile[0]);
      userId = profile[0].id;
      userInitials = profile[0].name.split(" ")[0][0] + profile[0].name.split(" ")[1][0];
      const allUsers = toAdd.filter(user => !profile[0].following.find(friend => friend === user.email) && user.email !== userEmail);
      setUsers(allUsers);
      const amigos = toAdd.filter(user => profile[0].following.find(friend => friend === user.email) && user.email !== userEmail);
      setFriends(amigos);
      setLoading(false);
    }
    catch(err) {
      console.log(err);
    }
  };

  const handleFollow =  async (user) => {
    try {
      await updateDoc(doc(db, "users", me.id), {following: arrayUnion(user.email)});
      setLoading(true);
      setUpdate(!update);
    }
    catch(err) {
        console.log(err);
    }
  }

  const handleUnfollow = async (user) => {
    try {
      await updateDoc(doc(db, "users", me.id), {following: arrayRemove(user.email)});
      setLoading(true);
      setUpdate(!update);
    }
    catch(err) {
        console.log(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, [update]);

  return (
    <Flex flexDirection="row">
      <Flex flexDirection="column">
        <Heading fontSize="26px" mb="25px" ml="100px">My Profile</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="60px" backgroundColor="lightgray" flexDirection="column">
            {loading ?
            <Spinner /> :
            <Flex mb="10px" borderRadius="10px" padding="25px" backgroundColor="white" flexDirection="column">
            <Circle size='40px' bg='red' color='white'>{userInitials}</Circle>
              <Text>{me.name}</Text>
              <Text>{me.genres}</Text>
              <Text>{me.actors}</Text>
            </Flex>
            }
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Heading fontSize="26px" mb="25px" ml="100px">My Friends</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="60px" backgroundColor="lightgray" flexDirection="column">
          {loading ? <Spinner /> : friends.length === 0 ? (
            <Text mt="25px" mb="25px">You have not followed any friends yet!</Text>
          ) : 
            (
            friends.map((friend, index) => {
              return (
                  <FriendCard handleRouteChange={props.handleRouteChange} handleFollow={handleFollow} handleUnfollow={handleUnfollow} following={true} friend={friend} key={index} />
              )
            })
          )}
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Heading fontSize="26px" mb="25px" ml="100px">Follow Users</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="60px" backgroundColor="lightgray" flexDirection="column">
          {loading ? <Spinner /> : users.length === 0 ? (
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
    </Flex>
  );
};

export default Friends;