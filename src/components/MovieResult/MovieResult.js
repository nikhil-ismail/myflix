import React, { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Button, Text, Flex, Image, Heading } from '@chakra-ui/react';
import { doc, collection, deleteDoc, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { Box, Spinner } from '@chakra-ui/react'

const MovieResult = (props) => {

    /*
    BUGS in modal
    - delete doesn't work
    - favourites/watch list will only get updated when you close the modal (internally for code)
    */

    const { result } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [liked, setLiked] = useState(false);
    const [listed, setListed] = useState(false);
    const [favLoading, setFavLoading] = useState(true);
    const [watchLoading, setWatchLoading] = useState(true);

    const watchListCollectionRef = collection(db, "watch-list");
    const favouritesCollectionRef = collection(db, "favourites");

    const userEmail = auth.currentUser.email;

    const getFavourites = async () => {
        try {
          const q = query(collection(db, "favourites"), where("email", "==", userEmail));
          const data = await getDocs(q);
          const favourites = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setLiked(favourites.find(item => item.movie.title === result.Title && item.movie.year === result.Year) ? true : false);
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
          setListed(watchList.find(item => item.movie.title === result.Title && item.movie.year === result.Year) ? true : false);
          setWatchLoading(false);
        }
        catch(err) {
          console.log(err);
        }
    };

    useEffect(() => {
        getFavourites();
        getWatchList();
    }, []);

    const handleWatchList = async (film) => {
        let movie = {
          id: film.imdbID,
          image: film.Poster,
          title: film.Title,
          type: film.Type,
          year: film.Year,
        };
        try {
            setListed(true);
            await addDoc(watchListCollectionRef, { email: userEmail, movie: movie });
            getWatchList();
        }
        catch(err) {
            console.log(err);
        }
    };

    const handleRemoveWatch = async (film) => {
        try {
            setListed(false);
            const q = query(collection(db, "watch-list"), where("email", "==", userEmail));
            const data = await getDocs(q);
            const watchList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            let movie = watchList.find(item => item.movie.title === film.Title && item.movie.year === film.Year);
            await deleteDoc(doc(db, "watch-list", movie.id));
            getWatchList();
        }
        catch(err) {
            console.log(err);
        }
    }
    
    const handleLike = async (film) => {
        let movie = {
            id: film.imdbID,
            image: film.Poster,
            title: film.Title,
            type: film.Type,
            year: film.Year,
        };
        try {
            setLiked(true);
            await addDoc(favouritesCollectionRef, { email: userEmail, movie: movie });
            getFavourites();
        }
        catch(err) {
            console.log(err);
        }
    };

    const handleUnlike = async (film) => {
        try {
            setLiked(false);
            const q = query(collection(db, "favourites"), where("email", "==", userEmail));
            const data = await getDocs(q);
            const favourites = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            let movie = favourites.find(item => item.movie.title === film.Title && item.movie.year === film.Year);
            await deleteDoc(doc(db, "favourites", movie.id));
            getFavourites();
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <Flex>
            <Flex cursor="pointer" flexDirection="row" mb="25px" onClick={onOpen}>
                <Image width="100px" src={result.Poster} alt="movie" />
                <Flex flexDirection="column" ml="20px">
                    <Heading fontSize="20px">{result.Title}</Heading>
                    <Text>{result.Year} •  
                    {result.Type === "series" ? " TV Series" :
                    " " + result.Type.charAt(0).toUpperCase() + result.Type.slice(1)}</Text>
                </Flex>
            </Flex>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader fontSize="26px">{result.Title} ({result.Year})</ModalHeader>
                <ModalBody>
                {
                favLoading || watchLoading ?
                <Spinner /> :
                <Box>
                    <Image width="250px" src={result.Poster} alt="movie" />
                    {listed ?
                    <Button mt="20px" mr="20px" onClick={() => handleRemoveWatch(result)}>Remove from Watch List</Button> :
                    <Button mt="20px" mr="20px" onClick={() => handleWatchList(result)}>Add to Watch List</Button>
                    }
                    {liked ?
                    <Button mt="20px" onClick={() => handleUnlike(result)}>Unlike</Button> :
                    <Button mt="20px" onClick={() => handleLike(result)}>Like</Button>
                    }
                </Box>
                }
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default MovieResult;