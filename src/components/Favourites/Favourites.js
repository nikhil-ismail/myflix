import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { Text, Flex, Heading } from "@chakra-ui/react";
import MyList from "../MyList/MyList";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [watchList, setWatchList] = useState([]);

  const userEmail = auth.currentUser.email;

  useEffect(() => {
    const getFavourites = async () => {
      try {
        const q = query(collection(db, "favourites"), where("email", "==", userEmail));
        const data = await getDocs(q);
        setFavourites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      catch(err) {
        console.log(err);
      }
    };
    const getWatchList = async () => {
      try {
        const q = query(collection(db, "watch-list"), where("email", "==", userEmail));
        const data = await getDocs(q);
        setWatchList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      catch(err) {
        //console.log(err);
      }
    };
    getFavourites();
    getWatchList();
  }, [favourites, watchList]);

  return (
    <Flex flexDirection="row">
      <Flex borderRadius="10px" padding="25px" marginLeft="40px" backgroundColor="lightgray" flexDirection="column">
        <Heading fontSize="26px" mb="25px">Favourite Movies</Heading>
        {favourites.length === 0 ? (
          <Text>You have not liked any movies yet!</Text>
        ) : (
          favourites.map((favourite, index) => {
            return (
              <MyList favourites={favourites} watchList={watchList} key={index} movie={favourite} />
            )
          })
        )}
      </Flex>
      <Flex borderRadius="10px" padding="25px" marginLeft="60px" backgroundColor="lightgray" flexDirection="column">
        <Heading fontSize="26px" mb="25px">My Watch List</Heading>
        {watchList.length === 0 ? (
          <Text>You have not added any movies to your watch list yet!</Text>
        ) : (
          watchList.map((watch, index) => {
            return (
              <MyList favourites={favourites} watchList={watchList} key={index} movie={watch} />
            )
          })
        )}
      </Flex>
    </Flex>
  );
};

export default Favourites;
