import React, { useState, useEffect } from "react";
import { Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import { collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import FriendCard from "../FriendCard/FriendCard";
import UserProfile from "../UserProfile/UserProfile";
import HorizontalScroll from 'react-horizontal-scrolling';

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
    <Flex pb="15%" ml="30px" flexDirection="row">
      <Flex mr="30px" flexDirection="column">
        <UserProfile />
      </Flex>
      <Flex width="1100px" flexDirection="column">
        <Flex ml="25px" mb="25px" flexDirection="column">
          <Heading ml="25px" color="#1BA098" fontSize="26px">My Friends</Heading>
          <Flex backgroundColor="#051622" flexDirection="column" mr="30px" padding="20px" borderRadius="10px">
            {loading ? <Spinner /> : friends.length === 0 ? (
                <Flex width="350px" backgroundColor="#c4cfce" flexDirection="column" mr="30px" padding="20px" borderRadius="10px">
                  <Text mt="25px" mb="25px">You have not followed any friends yet!</Text>
                </Flex>
            ) : 
            <HorizontalScroll>
              <Flex ml="5px" mr="5px">
                {friends.map((friend, index) => {
                return (
                  <FriendCard profile={false} loading={loading} handleRouteChange={props.handleRouteChange} handleFollow={handleFollow} handleUnfollow={handleUnfollow} following={true} friend={friend} key={index} />
                )
                })}
              </Flex>
            </HorizontalScroll> 
            }
          </Flex>
        </Flex>
        <Flex ml="25px" mb="25px" flexDirection="column">
          <Heading ml="25px" color="#1BA098" fontSize="26px">Follow Users</Heading>
          <Flex backgroundColor="#051622" flexDirection="column" mr="30px" padding="20px" borderRadius="10px">
            {loading ? <Spinner /> : users.length === 0 ? (
              <Flex width="350px" backgroundColor="#c4cfce" flexDirection="column" mr="30px" padding="20px" borderRadius="10px">
                <Text mt="25px" mb="25px">You have follwed all users!</Text>
              </Flex>
            ) : 
            <HorizontalScroll>
              <Flex ml="5px" mr="5px">
                {users.map((user, index) => {
                return (
                  <FriendCard profile={false} loading={loading} handleFollow={handleFollow} handleUnfollow={handleUnfollow} following={false} friend={user} key={index} />
                  )
                })}
              </Flex>
            </HorizontalScroll> 
            }
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Friends;