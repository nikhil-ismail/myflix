import React, { useState, useEffect } from "react";
import { Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import { collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import FriendCard from "../FriendCard/FriendCard";
import UserProfile from "../UserProfile/UserProfile";

const Friends = (props) => {

  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [me, setMe] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const userEmail = auth.currentUser.email;
  const usersCollectionRef = collection(db, "users");

  const getUsers = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const toAdd = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const profile = toAdd.filter(user => user.email === userEmail);
      setMe(profile[0]);
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
    <Flex ml="30px" flexDirection="row">
      <Flex mr="30px" flexDirection="column">
        <UserProfile />
      </Flex>
      <Flex flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px">My Friends</Heading>
        <Flex width="450px" borderRadius="10px" flexDirection="column">
          {loading ? <Spinner /> : friends.length === 0 ? (
            <Flex mb="15px" borderRadius="10px" padding="20px" backgroundColor="#718ea3" flexDirection="column">
              <Text mt="25px" mb="25px">You have not followed any friends yet!</Text>
            </Flex>
          ) : 
            (
            friends.map((friend, index) => {
              return (
                  <FriendCard loading={loading} handleRouteChange={props.handleRouteChange} handleFollow={handleFollow} handleUnfollow={handleUnfollow} following={true} friend={friend} key={index} />
              )
            })
          )}
        </Flex>
      </Flex>
      <Flex ml="30px" flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px">Follow Users</Heading>
        <Flex width="450px" borderRadius="10px" flexDirection="column">
          {loading ? <Spinner /> : users.length === 0 ? (
            <Text mt="25px" mb="25px">You have follwed all users!</Text>
          ) : 
            (
            users.map((user, index) => {
              return (
                  <FriendCard loading={loading} handleFollow={handleFollow} handleUnfollow={handleUnfollow} following={false} friend={user} key={index} />
              )
            })
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Friends;