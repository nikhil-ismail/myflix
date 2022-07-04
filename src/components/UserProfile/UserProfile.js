import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { Text, Heading, Flex, Spinner, Circle, useDisclosure, Stack, FormControl, FormLabel, Input, Popover, PopoverTrigger, IconButton, PopoverContent, PopoverArrow, PopoverCloseButton, ButtonGroup, Button } from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons'
import FocusLock from "react-focus-lock";
import ProfileTag from "../ProfileTag/ProfileTag";

const UserProfile = () => {

  const [update, setUpdate] = useState(false);
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
  let splitGenres = me.genres ? me.genres.split(" ") : [];
  let splitActors = me.actors ? me.actors.split(" ") : [];
  let fullActors = [];

  for (let i = 0; i < splitActors.length - 1; i = i + 2) {
      let data = splitActors.slice(i, i + 2).join(" ");
      data = data.split(" ");
      let first = data[0][0].toUpperCase() + data[0].substring(1, data[0].length) + " ";
      let last = data[1][0].toUpperCase() + data[1].substring(1, data[1].length);
      fullActors.push(first.concat(last));
  }

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
    <Flex flexDirection="column">
        <Heading color="#1BA098" fontSize="26px" mb="25px">My Profile</Heading>
        <Flex width="400px" flexWrap="wrap" flexDirection="column">
            <Flex borderRadius="10px" padding="20px" backgroundColor="#DEB992" flexDirection="column">
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
                }
            </Flex>
        </Flex>
    </Flex>
  );
};

export default UserProfile;