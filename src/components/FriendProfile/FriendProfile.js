import React, { useEffect, useState } from "react";
import { Text, Heading, Flex, Circle, Spinner, Center, Divider } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import MyList from "../MyList/MyList";
import FriendCard from "../FriendCard/FriendCard";
import HorizontalScroll from 'react-horizontal-scrolling';

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
    <Flex pb="15%" flexDirection="row">
      <Flex flexDirection="column" ml="25px" mt="15px">
        <FriendCard profile={true} friend={profile} />
      </Flex>
      <Flex width="515px" ml="30px" flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px">{profile.name && profile.name.split(" ")[0]}'s Favourites</Heading>
        <Flex borderRadius="10px" padding="25px" backgroundColor="#c4cfce" flexDirection="column">
          <Flex flexDirection="column">
            <Heading fontSize="24px">Movies</Heading>
            {favLoading ? <Spinner justifyContent="center" alignItems="center" /> : movieFavs.length === 0 ? (
              <Text mt="15px" mb="25px">{profile.name.split(" ")[0]} has not liked any movies yet!</Text>
            ) : 
              <HorizontalScroll>
                <Flex ml="5px" mr="5px">
                  {movieFavs.map((favourite, index) => {
                  return (
                    <MyList handleUpdate={handleUpdate} key={index} movie={favourite} />
                    )
                  })}
                </Flex>
              </HorizontalScroll> 
            }
          </Flex>
          <Center mb="30px">
            <Divider orientation='horizontal' />
          </Center>
          <Flex flexDirection="column">
            <Heading fontSize="24px">TV Shows</Heading>
            {favLoading ? <Spinner justifyContent="center" alignItems="center" /> : tvFavs.length === 0 ? (
              <Text mt="15px" mb="25px">{profile.name.split(" ")[0]} has not liked any tv shows yet!</Text>
            ) : 
            <HorizontalScroll>
              <Flex ml="5px" mr="5px">
                {tvFavs.map((favourite, index) => {
                return (
                  <MyList handleUpdate={handleUpdate} key={index} movie={favourite} />
                  )
                })}
              </Flex>
            </HorizontalScroll> 
            }
          </Flex>
        </Flex>
      </Flex>
      <Flex width="515px" ml="30px" flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px">{profile.name && profile.name.split(" ")[0]}'s  Watch List</Heading>
        <Flex borderRadius="10px" padding="25px" backgroundColor="#c4cfce" flexDirection="column">
          <Flex flexDirection="column">
            <Heading fontSize="24px">Movies</Heading>
            {watchLoading ? <Spinner justifyContent="center" alignItems="center" /> : movieWatch.length === 0 ? (
              <Text mt="15px" mb="25px">{profile.name.split(" ")[0]} has not added any movies to their watch list yet!</Text>
            ) :
              <HorizontalScroll>
                <Flex ml="5px" mr="5px">
                  {movieWatch.map((watch, index) => {
                  return (
                    <MyList handleUpdate={handleUpdate} key={index} movie={watch} />
                    )
                  })}
                </Flex>
              </HorizontalScroll> 
            }
          </Flex>
          <Center mb="30px">
            <Divider orientation='horizontal' />
          </Center>
          <Flex flexDirection="column">
            <Heading fontSize="24px">TV Shows</Heading>
            {watchLoading ? <Spinner justifyContent="center" alignItems="center" /> : tvWatch.length === 0 ? (
              <Text mt="15px" mb="25px">{profile.name.split(" ")[0]} has not added any tv shows to their watch list yet!</Text>
            ) :
              <HorizontalScroll>
                <Flex ml="5px" mr="5px">
                  {tvWatch.map((watch, index) => {
                  return (
                    <MyList handleUpdate={handleUpdate} key={index} movie={watch} />
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

export default FriendProfile;
