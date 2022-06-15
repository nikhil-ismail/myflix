import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Button, Text, Flex, Image, Heading } from '@chakra-ui/react';
import { doc, collection, deleteDoc, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";

const MyList = (props) => {

    const { movie, favourites, watchList } = props;
    const [liked, setLiked] = useState(false);
    const [listed, setListed] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const watchListCollectionRef = collection(db, "watch-list");
    const favouritesCollectionRef = collection(db, "favourites");
    const userEmail = auth.currentUser.email;

    useEffect(() => {
        for (let i = 0; i < favourites.length; i++) {
            if (favourites[i].id === movie.id) {
                setLiked(true);
            }
        }
        for (let i = 0; i < watchList.length; i++) {
            if (watchList[i].id === movie.id) {
                setListed(true);
            }
        }
    }, [liked, listed]);

    const handleLike = async (film) => {
        try {
            let movie = {
                id: film.id,
                image: film.image,
                title: film.title,
                type: film.type,
                year: film.year,
            };
            await addDoc(favouritesCollectionRef, { email: userEmail, movie: movie });
            setLiked(true);
        }
        catch(err) {
            console.log(err);
        }
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

    const handleWatchList = async (film) => {
        try {
            let movie = {
                id: film.id,
                image: film.image,
                title: film.title,
                type: film.type,
                year: film.year,
            };
            await addDoc(watchListCollectionRef, { email: userEmail, movie: movie });
            setListed(true);
        }
        catch(err) {
            console.log(err);
        }
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

    return (
        <Flex>
            <Flex cursor="pointer" flexDirection="row" mb="25px" onClick={onOpen}>
                <Image width="100px" src={movie.movie.image} alt="movie" />
                <Flex flexDirection="column" ml="20px">
                    <Heading fontSize="20px">{movie.movie.title}</Heading>
                    <Text>{movie.movie.year} • {movie.movie.type}</Text>
                </Flex>
            </Flex>

            <Modal size={"lg"} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader fontSize="26px">{movie.movie.title} ({movie.movie.year})</ModalHeader>
                <ModalBody>
                    <Image width="250px" src={movie.movie.image} alt="movie" />
                    {listed ?
                    <Button mt="20px" mr="20px" onClick={() => handleRemoveWatch(movie)}>Remove from Watch List</Button> :
                    <Button mt="20px" mr="20px" onClick={() => handleWatchList(movie.movie)}>Add to Watch List</Button>
                    }
                    {liked ?
                    <Button mt="20px" onClick={() => handleUnlike(movie)}>Unlike</Button> :
                    <Button mt="20px" onClick={() => handleLike(movie.movie)}>Like</Button>
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

export default MyList;