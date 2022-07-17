import React, { useState, useEffect } from "react";
import { Box, Spinner, Icon, Divider, Square, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure, Text, Flex, Image } from '@chakra-ui/react';
import { collection, getDocs, query, where, doc, deleteDoc, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import axios from 'axios';
import { FaImdb } from 'react-icons/fa';
import { SiRottentomatoes } from 'react-icons/si';
import { AiOutlineHeart, AiFillHeart, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const MyList = (props) => {

    const { movie } = props;

    const [liked, setLiked] = useState(false);
    const [listed, setListed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState({});

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
        axios.get(`http://www.omdbapi.com/?apikey=dffd1309&i=${movie.movie.id}`)
        .then(response => {
            if (response.data.Response === "True") {
                const data = response.data;
                setMovieDetails(data);
                setLoading(false);
            } else {
                setMovieDetails({});
            }
        })
        .catch(err => {
            console.log(err);
        })
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
            <Flex _hover={{ transform: "scale(1.1)" }} transition="transform .4s" p="10px" mt="10px" mb="5px" width="150px" cursor="pointer" flexDirection="column" onClick={onOpen}>
                <Image borderRadius="10px" height="200px" width="150px" src={movie.movie.image} alt="movie" />
            </Flex>

            <Modal size={"3xl"} onClose={handleClose} isOpen={isOpen} isCentered>
                <ModalOverlay backdropFilter='blur(10px)' />
                <ModalContent backgroundColor="#051622" color="#c4cfce">
                    {loading ? <Spinner /> :
                    <Box pb="30px">
                        <Flex flexDirection="row">
                            <Flex flexDirection="column">
                                <ModalHeader ml="5px" fontSize="35px">{movie.movie.title}</ModalHeader>
                            </Flex>
                        </Flex>
                        <ModalBody>
                            <Flex flexDirection="column">
                                <Flex flexDirection="row">
                                    <Image borderRadius="10px" width="275px" src={movie.movie.image} alt="movie" />
                                    <Flex flexDirection="column">
                                        <Flex ml="20px" flexDirection="column">
                                            <Flex flexDirection="row">
                                                <Square fontWeight="bold" width="70px" height="35px" pl="5px" pr="5px" bg='#c4cfce' border="1px solid black" color="#051622">{movieDetails.Rated}</Square>
                                                <Text fontWeight="bold" ml="25px" mt="5px">{movieDetails.Runtime}</Text>
                                                <Flex ml="25px" flexDirection="row">
                                                    <Icon as={FaImdb} w={9} h={9} />
                                                    <Text ml="7px" mt="5px">{movieDetails.imdbRating && movieDetails.imdbRating + "/10"}</Text>
                                                </Flex>
                                                <Flex ml="25px" flexDirection="row">
                                                    <Icon as={SiRottentomatoes} w={9} h={9} />
                                                    <Text ml="7px" mt="5px">{movieDetails.Ratings.find(rating => rating.Source === "Rotten Tomatoes") !== undefined ? movieDetails.Ratings[1].Value : "N/A"}</Text>
                                                </Flex>
                                            </Flex>
                                            <Divider mt="15px" mb="15px" orientation="horizontal" />
                                            <Text mb="10px">{movieDetails.Plot}</Text>
                                            <Flex mb="10px" flexDirection="row">
                                                <Text fontWeight="bold">Genre:</Text>
                                                <Text ml="5px">{movieDetails.Genre}</Text>
                                            </Flex>
                                            <Flex mb="10px" flexDirection="row">
                                                <Text fontWeight="bold">Cast:</Text>
                                                <Text ml="5px">{movieDetails.Actors}</Text>
                                            </Flex>
                                            <Flex mb="10px" flexDirection="row">
                                                <Text fontWeight="bold">Director:</Text>
                                                <Text ml="5px">{movieDetails.Director}</Text>
                                            </Flex>
                                            <Flex mb="10px" flexDirection="row">
                                                <Text fontWeight="bold">Released:</Text>
                                                <Text ml="5px">{movieDetails.Released}</Text>
                                            </Flex>
                                            {movie.movie.type === "movie" && 
                                            <Flex mb="10px" flexDirection="row">
                                                <Text fontWeight="bold">Box Office:</Text>
                                                <Text ml="5px">{movieDetails.BoxOffice}</Text>
                                            </Flex>
                                            }
                                        </Flex>
                                        <Flex ml="20px" flexDirection="row">
                                            {listed ?
                                            <Flex cursor="pointer" onClick={() => handleRemoveWatch(movie)} _hover={{ backgroundColor: "#c4cfce", color: "black", padding: "10px", borderRadius: "20px" }} p="10px" mb="15px" mt="15px" mr="15px">
                                                <Text mt="2px" mr="10px">Remove</Text>
                                                <Icon w={7} h={7} as={AiOutlineMinus} /> 
                                            </Flex>
                                            :
                                            <Flex cursor="pointer" onClick={() => handleWatchList(movie.movie)} _hover={{ backgroundColor: "#c4cfce", color: "black", padding: "10px", borderRadius: "20px" }} p="10px" mb="15px" mt="15px" mr="15px">
                                                <Text mt="2px" mr="10px">Add</Text>
                                                <Icon w={7} h={7} as={AiOutlinePlus} />
                                            </Flex>
                                            }
                                            <Divider mt="20px" mr="15px" orientation="vertical" height="30px" />
                                            {liked ?
                                            <Flex cursor="pointer"  onClick={() => handleUnlike(movie)} _hover={{ backgroundColor: "#c4cfce", color: "black", padding: "10px", borderRadius: "20px" }} p="10px" mb="15px" mt="15px" mr="15px">
                                                <Text mt="2px" mr="10px">Unlike</Text>
                                                <Icon w={7} h={7} as={AiFillHeart} />
                                            </Flex>
                                            :
                                            <Flex cursor="pointer"  onClick={() => handleLike(movie.movie)} _hover={{ backgroundColor: "#c4cfce", color: "black", padding: "10px", borderRadius: "20px" }} p="10px" mb="15px" mt="15px" mr="15px">
                                                <Text mt="2px" mr="10px">Like</Text>
                                                <Icon alt="" w={7} h={7} as={AiOutlineHeart} />
                                            </Flex>
                                            }
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </ModalBody>
                    </Box>}
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default MyList;