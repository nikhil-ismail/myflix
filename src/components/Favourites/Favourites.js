import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { Text, Flex, Heading, Spinner, Divider, Center } from "@chakra-ui/react";
import MyList from "../MyList/MyList";
import UserProfile from "../UserProfile/UserProfile";

const Favourites = () => {

  const [movieFavs, setMovieFavs] = useState([]);
  const [tvFavs, setTvFavs] = useState([]);
  const [movieWatch, setMovieWatch] = useState([]);
  const [tvWatch, setTvWatch] = useState([]);
  const [update, setUpdate] = useState(false);
  const [favLoading, setFavLoading] = useState(true);
  const [watchLoading, setWatchLoading] = useState(true);

  const userEmail = auth.currentUser.email;

  const getFavourites = async () => {
    try {
      const q = query(collection(db, "favourites"), where("email", "==", userEmail));
      const data = await getDocs(q);
      const favourites = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovieFavs(favourites.filter(item => item.movie.type === "movie"));
      setTvFavs(favourites.filter(item => item.movie.type === "series"));
      setFavLoading(false);
    }
    catch(err) {
      console.log(err);
    }
  };

  const getWatchList = async () => {
    try {
      const q = query(collection(db, "watch-list"), where("email", "==", userEmail));
      const data = await getDocs(q);
      const watchList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovieWatch(watchList.filter(item => item.movie.type === "movie"));
      setTvWatch(watchList.filter(item => item.movie.type === "series"));
      setWatchLoading(false);
    }
    catch(err) {
      console.log(err);
    }
  };

  const handleUpdate = () => {
    setUpdate(!update);
  }

  useEffect(() => {
    getFavourites();
    getWatchList();
  }, [update]);

  return (
    <Flex pb="100%" flexDirection="row">
      <Flex ml="30px" flexDirection="column">
        <UserProfile />
      </Flex>
      <Flex ml="50px" width="400px" flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px">Favourites</Heading>
        <Flex borderRadius="10px" padding="25px" backgroundColor="#DEB992" flexDirection="row">
          <Flex flexDirection="column">
            <Heading fontSize="24px" mb="15px">Movies</Heading>
            {favLoading ? <Spinner justifyContent="center" alignItems="center" /> : movieFavs.length === 0 ? (
              <Text mb="25px">You have not liked any movies yet!</Text>
            ) : 
              (
              movieFavs.map((favourite, index) => {
                return (
                    <MyList handleUpdate={handleUpdate} key={index} movie={favourite} />
                )
              })
            )}
          </Flex>
          <Center pr="30px" height='100%'>
            <Divider orientation='vertical' />
          </Center>
          <Flex flexDirection="column">
            <Heading fontSize="24px" mb="15px">TV Shows</Heading>
            {favLoading ? <Spinner justifyContent="center" alignItems="center" /> : tvFavs.length === 0 ? (
              <Text mb="25px">You have not liked any tv shows yet!</Text>
            ) : 
              (
              tvFavs.map((favourite, index) => {
                return (
                    <MyList handleUpdate={handleUpdate} key={index} movie={favourite} />
                )
              })
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex ml="50px" width="400px" flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px">My Watch List</Heading>
        <Flex borderRadius="10px" padding="25px" backgroundColor="#DEB992" flexDirection="row">
          <Flex flexDirection="column">
            <Heading fontSize="24px" mb="15px">Movies</Heading>
            {watchLoading ? <Spinner justifyContent="center" alignItems="center" /> : movieWatch.length === 0 ? (
              <Text mb="25px">You have not added any movies to your watch list yet!</Text>
            ) : (
              movieWatch.map((watch, index) => {
                return (
                  <MyList handleUpdate={handleUpdate} key={index} movie={watch} />
                )
              })
            )}
          </Flex>
          <Center pr="30px" height='100%'>
            <Divider orientation='vertical' />
          </Center>
          <Flex flexDirection="column">
            <Heading fontSize="24px" mb="15px">TV Shows</Heading>
            {watchLoading ? <Spinner justifyContent="center" alignItems="center" /> : tvWatch.length === 0 ? (
              <Text mb="25px">You have not added any tv shows to your watch list yet!</Text>
            ) : (
              tvWatch.map((watch, index) => {
                return (
                  <MyList handleUpdate={handleUpdate} key={index} movie={watch} />
                )
              })
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Favourites;