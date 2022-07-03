import React, { useEffect, useState } from "react";
import { Text, Heading, Flex, Circle, Spinner } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import MyList from "../MyList/MyList";

const FriendProfile = (props) => {

  const { profile } = props;

  const [movieFavs, setMovieFavs] = useState([]);
  const [tvFavs, setTvFavs] = useState([]);
  const [movieWatch, setMovieWatch] = useState([]);
  const [tvWatch, setTvWatch] = useState([]);
  const [update, setUpdate] = useState(false);
  const [favLoading, setFavLoading] = useState(true);
  const [watchLoading, setWatchLoading] = useState(true);

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
    <Flex flexDirection="row">
      <Flex flexDirection="column">
        <Heading color="#1BA098">{profile.name}</Heading>
        <Flex mb="10px" borderRadius="10px" padding="25px" backgroundColor="#DEB992" flexDirection="column">
          <Circle size='40px' bg='#1BA098' color='#051622'>{profile.name && profile.name.split(" ")[0][0] + profile.name.split(" ")[1][0]}</Circle>
          <Text>{profile.name}</Text>
          <Text>{profile.genres}</Text>
          <Text>{profile.actors}</Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px" ml="150px">{profile.name && profile.name.split(" ")[0]}'s Favourites</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="40px" backgroundColor="#DEB992" flexDirection="column">
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
      <Flex flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px" ml="150px">{profile.name && profile.name.split(" ")[0]}'s  Watch List</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="60px" backgroundColor="#DEB992" flexDirection="column">
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
  );
};

export default FriendProfile;
