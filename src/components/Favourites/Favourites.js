import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { Flex, Text } from "@chakra-ui/react";
import CategoryList from "../CategoryList/CategoryList";

const Favourites = () => {

  const [movieFavs, setMovieFavs] = useState([]);
  const [tvFavs, setTvFavs] = useState([]);
  const [movieWatch, setMovieWatch] = useState([]);
  const [tvWatch, setTvWatch] = useState([]);
  const [update, setUpdate] = useState(false);
  const [favLoading, setFavLoading] = useState(true);
  const [watchLoading, setWatchLoading] = useState(true);
  const [clicked, setClicked] = useState("all");

  const userEmail = auth.currentUser.email;

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

  const handleUpdate = () => {
    setUpdate(!update);
  }

  useEffect(() => {
    getFavourites();
    getWatchList();
  }, [update]);

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="center" flexDirection="row" mb="30px">
        {clicked !== "all" ?
        <Flex _hover={{ transform: "scale(1.1)" }} transition="transform .4s" onClick={() => setClicked('all')} cursor="pointer" mr="20px" alignItems="center" border="2px solid #1BA098" borderRadius="10px" p="5px 20px">
          <Text color="#1BA098">All</Text>
        </Flex> :
        <Flex backgroundColor="#1BA098" _hover={{ transform: "scale(1.1)" }} transition="transform .4s" onClick={() => setClicked('all')} cursor="pointer" mr="20px" alignItems="center" border="2px solid #1BA098" borderRadius="10px" p="5px 20px">
          <Text fontWeight="bold" color="#051622">All</Text>
        </Flex>
        }
        {clicked !== "movies" ?
        <Flex _hover={{ transform: "scale(1.1)" }} transition="transform .4s" onClick={() => setClicked('movies')} cursor="pointer" mr="20px" alignItems="center" border="2px solid #1BA098" borderRadius="10px" p="5px 20px">
          <Text color="#1BA098">Movies</Text>
        </Flex> :
        <Flex backgroundColor="#1BA098" _hover={{ transform: "scale(1.1)" }} transition="transform .4s" onClick={() => setClicked('movies')} cursor="pointer" mr="20px" alignItems="center" border="2px solid #1BA098" borderRadius="10px" p="5px 20px">
          <Text fontWeight="bold" color="#051622">Movies</Text>
        </Flex>
        }
        {clicked !== "shows" ?
        <Flex _hover={{ transform: "scale(1.1)" }} transition="transform .4s" onClick={() => setClicked('shows')} cursor="pointer" mr="20px" alignItems="center" border="2px solid #1BA098" borderRadius="10px" p="5px 20px">
          <Text color="#1BA098">TV Shows</Text>
        </Flex> :
        <Flex backgroundColor="#1BA098" _hover={{ transform: "scale(1.1)" }} transition="transform .4s" onClick={() => setClicked('shows')} cursor="pointer" mr="20px" alignItems="center" border="2px solid #1BA098" borderRadius="10px" p="5px 20px">
          <Text fontWeight="bold" color="#051622">TV Shows</Text>
        </Flex>
        }
        {clicked !== "favs" ?
        <Flex _hover={{ transform: "scale(1.1)" }} transition="transform .4s" onClick={() => setClicked('favs')} cursor="pointer" mr="20px" alignItems="center" border="2px solid #1BA098" borderRadius="10px" p="5px 20px">
          <Text color="#1BA098">Favourites</Text>
        </Flex> :
        <Flex backgroundColor="#1BA098" _hover={{ transform: "scale(1.1)" }} transition="transform .4s" onClick={() => setClicked('favs')} cursor="pointer" mr="20px" alignItems="center" border="2px solid #1BA098" borderRadius="10px" p="5px 20px">
          <Text fontWeight="bold" color="#051622">Favourites</Text>
        </Flex>
        }
        {clicked !== "watch" ?
        <Flex _hover={{ transform: "scale(1.1)" }} transition="transform .4s" onClick={() => setClicked('watch')} cursor="pointer" mr="20px" alignItems="center" border="2px solid #1BA098" borderRadius="10px" p="5px 20px">
          <Text color="#1BA098">Watch List</Text>
        </Flex> :
        <Flex backgroundColor="#1BA098" _hover={{ transform: "scale(1.1)" }} transition="transform .4s" onClick={() => setClicked('watch')} cursor="pointer" mr="20px" alignItems="center" border="2px solid #1BA098" borderRadius="10px" p="5px 20px">
          <Text fontWeight="bold" color="#051622">Watch List</Text>
        </Flex>
        }
      </Flex>
      { clicked === "all" ?
      <Flex flexDirection="column">
        <CategoryList title="Favourite Movies" list={movieFavs} handleUpdate={handleUpdate} loading={favLoading} type="movies" action="liked" />
        <CategoryList title="Favourite TV Shows" list={tvFavs} handleUpdate={handleUpdate} loading={favLoading} type="tv shows" action="liked" />
        <CategoryList title="Movie Watch List" list={movieWatch} handleUpdate={handleUpdate} loading={watchLoading} type="movies" action="added" />
        <CategoryList title="TV Watch List" list={tvWatch} handleUpdate={handleUpdate} loading={watchLoading} type="tv shows" action="added" />
      </Flex>
      : clicked === "movies" ?
      <Flex flexDirection="column">
        <CategoryList title="Favourite Movies" list={movieFavs} handleUpdate={handleUpdate} loading={favLoading} type="movies" action="liked" />
        <CategoryList title="Movie Watch List" list={movieWatch} handleUpdate={handleUpdate} loading={watchLoading} type="movies" action="added" />
      </Flex>
      : clicked === "shows" ?
      <Flex flexDirection="column">
        <CategoryList title="Favourite TV Shows" list={tvFavs} handleUpdate={handleUpdate} loading={favLoading} type="tv shows" action="liked" />
        <CategoryList title="TV Watch List" list={tvWatch} handleUpdate={handleUpdate} loading={watchLoading} type="tv shows" action="added" />
      </Flex>
      : clicked === "favs" ?
      <Flex flexDirection="column">
        <CategoryList title="Favourite Movies" list={movieFavs} handleUpdate={handleUpdate} loading={favLoading} type="movies" action="liked" />
        <CategoryList title="Favourite TV Shows" list={tvFavs} handleUpdate={handleUpdate} loading={favLoading} type="tv shows" action="liked" />
      </Flex>
      :
      <Flex flexDirection="column">
        <CategoryList title="Movie Watch List" list={movieWatch} handleUpdate={handleUpdate} loading={watchLoading} type="movies" action="added" />
        <CategoryList title="TV Watch List" list={tvWatch} handleUpdate={handleUpdate} loading={watchLoading} type="tv shows" action="added" />
      </Flex>
      }
    </Flex>
  );
};

export default Favourites;