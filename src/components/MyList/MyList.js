import React, { useState, useEffect } from "react";
import { Box, Spinner, Icon, Divider, Square, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure, Text, Flex, Image, Heading } from '@chakra-ui/react';
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

    console.log(movieDetails);

    return (
        <Flex>
            <Flex _hover={{ boxShadow:'dark-lg', rounded:'md', borderRadius: '10px'}} padding="5px" mt="10px" mb="5px" height="300px" width="150px" cursor="pointer" flexDirection="column" onClick={onOpen}>
                <Image borderRadius="10px" height="190px" width="125px" src={movie.movie.image} alt="movie" />
                <Flex width="140px" mt="10px" flexDirection="column">
                    <Heading color="#051622" fontSize="20px">{movie.movie.title.length > 20 ? movie.movie.title.substring(0, 21) + "..." : movie.movie.title}</Heading>
                    <Text mt="5px" color="#051622">{movie.movie.year} •  
                    {movie.movie.type === "series" ? " TV Series" :
                    " " + movie.movie.type.charAt(0).toUpperCase() + movie.movie.type.slice(1)}</Text>
                </Flex>
            </Flex>

            <Modal size={"3xl"} onClose={handleClose} isOpen={isOpen} isCentered>
                <ModalOverlay backdropFilter='blur(10px)' />
                <ModalContent backgroundColor="#051622" color="#718ea3">
                    {loading ? <Spinner /> :
                    <Box>
                        <Flex flexDirection="row">
                            <Flex flexDirection="column">
                                <ModalHeader ml="5px" fontSize="35px">{movie.movie.title}</ModalHeader>
                            </Flex>
                        </Flex>
                        <ModalBody>
                            <Flex flexDirection="column">
                                <Flex flexDirection="row">
                                    <Image borderRadius="10px" width="275px" src={movie.movie.image} alt="movie" />
                                    <Flex ml="20px" flexDirection="column">
                                        <Flex flexDirection="row">
                                            <Square fontWeight="bold" width="70px" height="35px" pl="5px" pr="5px" bg='#718ea3' border="1px solid black" color="#051622">{movieDetails.Rated}</Square>
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
                                </Flex>
                                <Flex ml="80px" flexDirection="row">
                                    {listed ?
                                    <Icon w={9} h={9} as={AiOutlineMinus} mb="15px" mt="15px" mr="30px" cursor="pointer" onClick={() => handleRemoveWatch(movie)} /> 
                                    :
                                    <Icon w={9} h={9} as={AiOutlinePlus} mb="15px" mt="15px" mr="30px" cursor="pointer" onClick={() => handleWatchList(movie.movie)} />
                                    }
                                    {liked ?
                                    <Icon w={9} h={9} as={AiFillHeart} mb="15px" mt="15px" mr="30px" cursor="pointer"  onClick={() => handleUnlike(movie)} /> :
                                    <Icon alt="" w={9} h={9} as={AiOutlineHeart} mb="15px" mt="15px" mr="30px" cursor="pointer"  onClick={() => handleLike(movie.movie)} />
                                    }
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