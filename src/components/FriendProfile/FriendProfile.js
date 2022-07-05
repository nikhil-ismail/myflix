import React, { useEffect, useState } from "react";
import { Text, Heading, Flex, Circle, Spinner, Center, Divider } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import MyList from "../MyList/MyList";
import ProfileTag from "../ProfileTag/ProfileTag";

const FriendProfile = (props) => {

  const { profile } = props;

  const [movieFavs, setMovieFavs] = useState([]);
  const [tvFavs, setTvFavs] = useState([]);
  const [movieWatch, setMovieWatch] = useState([]);
  const [tvWatch, setTvWatch] = useState([]);
  const [update, setUpdate] = useState(false);
  const [favLoading, setFavLoading] = useState(true);
  const [watchLoading, setWatchLoading] = useState(true);

  let splitGenres = profile.genres ? profile.genres.split(" ") : [];
  let splitActors = profile.actors ? profile.actors.split(" ") : [];
  let fullActors = [];

  for (let i = 0; i < splitActors.length - 1; i = i + 2) {
      let data = splitActors.slice(i, i + 2).join(" ");
      data = data.split(" ");
      let first = data[0][0].toUpperCase() + data[0].substring(1, data[0].length) + " ";
      let last = data[1][0].toUpperCase() + data[1].substring(1, data[1].length);
      fullActors.push(first.concat(last));
  }

  const getFavourites = async () => {
    try {
      const q = query(collection(db, "favourites"), where("email", "==", profile && profile.email));
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
      const q = query(collection(db, "watch-list"), where("email", "==", profile && profile.email));
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
  }, []);

  return (
    <Flex pb="100%" flexDirection="row">
      <Flex width="450px" pl="30px" pt="55px" flexDirection="column">
        <Flex mb="10px" borderRadius="10px" padding="25px" backgroundColor="#718ea3" flexDirection="column">
          <Flex flexDirection="column">
            <Flex flexDirection="row">
              <Circle size='50px' bg='#1BA098' color="#051622">{profile.name && profile.name.split(" ")[0][0] + profile.name.split(" ")[1][0]}</Circle>
              <Text fontSize="20px" fontWeight="bold" pr="15px" mt="10px" ml="10px" color="#051622">{profile.name}</Text>
            </Flex>
            <Flex flexDirection="row" width="100%">
              <Text mt="20px" mr="15px" fontWeight="bold">Genres</Text>
              {splitGenres && splitGenres.map((genre, index) => {
                return (
                  <ProfileTag key={index} value={genre} />
                )
              })}
            </Flex>
            <Flex flexDirection="row" width="100%">
              <Text mt="20px" mr="15px" fontWeight="bold">Actors</Text>
              {fullActors && fullActors.map((actor, index) => {
                return (
                  <ProfileTag key={index} value={actor} />
                )
              })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex width="400px" ml="30px" flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px">{profile.name && profile.name.split(" ")[0]}'s Favourites</Heading>
        <Flex borderRadius="10px" padding="25px" backgroundColor="#718ea3" flexDirection="row">
          <Flex flexDirection="column">
            <Heading fontSize="24px" mb="25px">Movies</Heading>
            {favLoading ? <Spinner justifyContent="center" alignItems="center" /> : movieFavs.length === 0 ? (
              <Text mb="25px">{profile.name.split(" ")[0]} has not liked any movies yet!</Text>
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
            <Heading fontSize="24px" mb="25px">TV Shows</Heading>
            {favLoading ? <Spinner justifyContent="center" alignItems="center" /> : tvFavs.length === 0 ? (
              <Text mb="25px">{profile.name.split(" ")[0]} has not liked any tv shows yet!</Text>
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
      <Flex width="400px" ml="30px" flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px">{profile.name && profile.name.split(" ")[0]}'s  Watch List</Heading>
        <Flex borderRadius="10px" padding="25px" backgroundColor="#718ea3" flexDirection="row">
          <Flex flexDirection="column">
            <Heading fontSize="24px" mb="25px">Movies</Heading>
            {watchLoading ? <Spinner justifyContent="center" alignItems="center" /> : movieWatch.length === 0 ? (
              <Text mb="25px">{profile.name.split(" ")[0]} has not added any movies to their watch list yet!</Text>
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
            <Heading fontSize="24px" mb="25px">TV Shows</Heading>
            {watchLoading ? <Spinner justifyContent="center" alignItems="center" /> : tvWatch.length === 0 ? (
              <Text mb="25px">{profile.name.split(" ")[0]} has not added any tv shows to their watch list yet!</Text>
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

export default FriendProfile;
