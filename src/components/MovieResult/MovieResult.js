import React, { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Button, Text, Flex, Image, Heading } from '@chakra-ui/react';
import { doc, collection, deleteDoc, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";

const MovieResult = (props) => {

    const { result, favourites, watchList } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [liked, setLiked] = useState(false);
    const [listed, setListed] = useState(false);
    const watchListCollectionRef = collection(db, "watch-list");
    const favouritesCollectionRef = collection(db, "favourites");
    const userEmail = auth.currentUser.email;

    useEffect(() => {
        for (let i = 0; i < favourites.length; i++) {
            if (favourites[i].movie.id === result.imdbID) {
                setLiked(true);
            }
        }
        for (let i = 0; i < watchList.length; i++) {
            if (watchList[i].movie.id === result.imdbID) {
                setListed(true);
            }
        }
    }, [liked, listed]);

    const handleWatchList = async (film) => {
        let movie = {
          id: film.imdbID,
          image: film.Poster,
          title: film.Title,
          type: film.Type,
          year: film.Year,
        };
        await addDoc(watchListCollectionRef, { email: userEmail, movie: movie });
    };

    const handleRemoveWatch = async (movie) => {
        try {
            await deleteDoc(doc(db, "watch-list", movie.id));
            setListed(false);
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
        await addDoc(favouritesCollectionRef, { email: userEmail, movie: movie });
    };

    const handleUnlike = async (movie) => {
        try {
            await deleteDoc(doc(db, "favourites", movie.id));
            setLiked(false);
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
                    <Text>{result.Year} • {result.Type}</Text>
                </Flex>
            </Flex>

            <Modal size={"lg"} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader fontSize="26px">{result.Title} ({result.Year})</ModalHeader>
                <ModalBody>
                    <Image width="250px" src={result.Poster} alt="movie" />
                    {listed ?
                    <Button mt="20px" mr="20px" onClick={() => handleRemoveWatch(result)}>Remove from Watch List</Button> :
                    <Button mt="20px" mr="20px" onClick={() => handleWatchList(result)}>Add to Watch List</Button>
                    }
                    {liked ?
                    <Button mt="20px" onClick={() => handleUnlike(result)}>Unlike</Button> :
                    <Button mt="20px" onClick={() => handleLike(result)}>Like</Button>
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