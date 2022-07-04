import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Button, Text, Flex, Image, Heading } from '@chakra-ui/react';
import { collection, getDocs, query, where, doc, deleteDoc, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";

const MyList = (props) => {

    const { movie } = props;

    const [liked, setLiked] = useState(false);
    const [listed, setListed] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const watchListCollectionRef = collection(db, "watch-list");
    const favouritesCollectionRef = collection(db, "favourites");

    const userEmail = auth.currentUser.email;

    const getFavourites = async () => {
        try {
          const q = query(collection(db, "favourites"), where("email", "==", userEmail));
          const data = await getDocs(q);
          const favourites = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setLiked(favourites.find(item => item.movie.title === movie.movie.title && item.movie.year === movie.movie.year) ? true : false);
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
          setListed(watchList.find(item => item.movie.title === movie.movie.title && item.movie.year === movie.movie.year) ? true : false);
        }
        catch(err) {
          console.log(err);
        }
    };

    useEffect(() => {
        getFavourites();
        getWatchList();
    }, []);

    const handleLike = async (film) => {
        let movie = {
            id: film.id,
            image: film.image,
            title: film.title,
            type: film.type,
            year: film.year,
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

    const handleUnlike = async (movie) => {
        try {
            setLiked(false);
            await deleteDoc(doc(db, "favourites", movie.id));
            getFavourites();
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleWatchList = async (film) => {
        let movie = {
            id: film.id,
            image: film.image,
            title: film.title,
            type: film.type,
            year: film.year,
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
    
    const handleRemoveWatch = async (movie) => {
        try {
            setListed(false);
            await deleteDoc(doc(db, "watch-list", movie.id));
            getWatchList();
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleClose = () => {
        onClose();
        props.handleUpdate();
    }

    return (
        <Flex>
            <Flex _hover={{ boxShadow:'dark-lg', rounded:'md', borderRadius: '10px'}} padding="5px" mt="10px" mb="5px" height="300px" width="175px" cursor="pointer" flexDirection="column" onClick={onOpen}>
                <Image borderRadius="10px" height="190px" width="125px" src={movie.movie.image} alt="movie" />
                <Flex width="140px" mt="10px" flexDirection="column">
                    <Heading color="#051622" fontSize="20px">{movie.movie.title.length > 20 ? movie.movie.title.substring(0, 21) + "..." : movie.movie.title}</Heading>
                    <Text color="#051622">{movie.movie.year} •  
                    {movie.movie.type === "series" ? " TV Series" :
                    " " + movie.movie.type.charAt(0).toUpperCase() + movie.movie.type.slice(1)}</Text>
                </Flex>
            </Flex>

            <Modal size={"lg"} onClose={handleClose} isOpen={isOpen} isCentered>
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
                    <Button onClick={handleClose}>Close</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default MyList;