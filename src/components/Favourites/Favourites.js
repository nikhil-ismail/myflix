import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { Text, Flex, Heading, Spinner, Circle, useDisclosure, Stack, FormControl, FormLabel, Input, Popover, PopoverTrigger, IconButton, PopoverContent, PopoverArrow, PopoverCloseButton, ButtonGroup, Button } from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons'
import FocusLock from "react-focus-lock";
import MyList from "../MyList/MyList";
import ProfileTag from "../ProfileTag/ProfileTag";

const Favourites = () => {

  const [movieFavs, setMovieFavs] = useState([]);
  const [tvFavs, setTvFavs] = useState([]);
  const [movieWatch, setMovieWatch] = useState([]);
  const [tvWatch, setTvWatch] = useState([]);
  const [update, setUpdate] = useState(false);
  const [favLoading, setFavLoading] = useState(true);
  const [watchLoading, setWatchLoading] = useState(true);
  const [meLoading, setMeLoading] = useState(true);
  const [me, setMe] = useState({});
  const [name, setName] = useState("");
  const [genres, setGenres] = useState("");
  const [actors, setActors] = useState("");

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  const userEmail = auth.currentUser.email;
  let userInitials = me.name && me.name.split(" ")[0][0].toUpperCase() + me.name.split(" ")[1][0].toUpperCase();
  const usersCollectionRef = collection(db, "users");
  let splitGenres = me.genres && me.genres.split(" ");
  let splitActors = me.actors && me.actors.split(" ");

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

  const getMe = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const toAdd = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const profile = toAdd.filter(user => user.email === userEmail);
      setMe(profile[0]);
      setName(me.name);
      setGenres(me.genres);
      setActors(me.actors);
      userInitials = profile[0].name.split(" ")[0][0] + profile[0].name.split(" ")[1][0];
      setMeLoading(false);
    }
    catch(err) {
      console.log(err);
    }
  };

  const handleUpdate = () => {
    setUpdate(!update);
  }

  const handleUpdateInfo = async () => {
    try {
      await updateDoc(doc(db, "users", me.id), { name: name, email: me.email, genres: genres, actors: actors, following: me.following });
      handleUpdate();
      onClose();
    }
    catch(err) {
        console.log(err);
    }
  }

  useEffect(() => {
    getFavourites();
    getWatchList();
    getMe();
  }, [update]);

  const TextInput = React.forwardRef((props, ref) => {
    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} />
      </FormControl>
    )
  })

  const Form = ({ firstFieldRef, onCancel }) => {
    return (
      <Stack spacing={4}>
        <TextInput onChange={(event) => {setName(event.target.value)}} placeholder={name} label='Name' id='name' ref={firstFieldRef} />
        <TextInput onChange={(event) => {setGenres(event.target.value)}} placeholder={genres} label='Genres' id='genres' />
        <TextInput onChange={(event) => {setActors(event.target.value)}} placeholder={actors} label='Actors' id='actors' />
        <ButtonGroup display='flex' justifyContent='flex-end'>
          <Button variant='outline' onClick={onCancel}>Cancel</Button>
          <Button onClick={handleUpdateInfo} colorScheme='teal'>Save</Button>
        </ButtonGroup>
      </Stack>
    )
  }

  const PopoverForm = () => {
    return (
      <>
        <Popover
          isOpen={isOpen}
          initialFocusRef={firstFieldRef}
          onOpen={onOpen}
          onClose={onClose}
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <IconButton size='sm' icon={<EditIcon />} />
          </PopoverTrigger>
          <PopoverContent p={5}>
            <FocusLock returnFocus persistentFocus={false}>
              <PopoverArrow />
              <PopoverCloseButton />
              <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
            </FocusLock>
          </PopoverContent>
        </Popover>
      </>
    )
  }

  return (
    <Flex flexDirection="row">
      <Flex flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px" ml="20px">My Profile</Heading>
        <Flex borderRadius="10px" padding="20px" marginLeft="20px" backgroundColor="#DEB992" flexDirection="column">
          {meLoading ? <Spinner /> :
          <Flex flexDirection="column">
            <Flex flexDirection="row">
              <Circle size='50px' bg='#1BA098' color="#051622">{userInitials}</Circle>
              <Text fontSize="20px" fontWeight="bold" pr="15px" mt="10px" ml="10px" color="#051622">{me.name}</Text>
              <Flex mt="8px">
                <PopoverForm />
              </Flex>
            </Flex>
            <Flex flexDirection="row" width="100%">
              <Text mt="15px" mr="15px" fontWeight="bold">Genres</Text>
              {splitGenres && splitGenres.map((genre, index) => {
                return (
                  <ProfileTag key={index} value={genre} />
                )
              })}
            </Flex>
            <Flex flexDirection="row" width="100%">
              <Text mt="15px" mr="15px" fontWeight="bold">Actors</Text>
              {splitActors && splitActors.map((actor, index) => {
                return (
                  <ProfileTag key={index} value={actor} />
                )
              })}
            </Flex>
          </Flex>
          }
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px" ml="150px">Favourites</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="40px" backgroundColor="#DEB992" flexDirection="column">
          <Heading fontSize="24px" mb="25px">Movies</Heading>
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
          <Heading fontSize="24px" mb="25px">TV Shows</Heading>
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
      <Flex flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px" ml="150px">My Watch List</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="60px" backgroundColor="#DEB992" flexDirection="column">
          <Heading fontSize="24px" mb="25px">Movies</Heading>
          {watchLoading ? <Spinner justifyContent="center" alignItems="center" /> : movieWatch.length === 0 ? (
            <Text mb="25px">You have not added any movies to your watch list yet!</Text>
          ) : (
            movieWatch.map((watch, index) => {
              return (
                <MyList handleUpdate={handleUpdate} key={index} movie={watch} />
              )
            })
          )}
          <Heading fontSize="24px" mb="25px">TV Shows</Heading>
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
  );
};

export default Favourites;
