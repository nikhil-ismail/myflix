import React, { useEffect, useState } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import FriendCard from "../FriendCard/FriendCard";
import CategoryList from "../CategoryList/CategoryList";

const FriendProfile = (props) => {

  const { profile } = props;

  const [movieFavs, setMovieFavs] = useState([]);
  const [tvFavs, setTvFavs] = useState([]);
  const [movieWatch, setMovieWatch] = useState([]);
  const [tvWatch, setTvWatch] = useState([]);
  const [update, setUpdate] = useState(false);
  const [favLoading, setFavLoading] = useState(true);
  const [watchLoading, setWatchLoading] = useState(true);
  const [clicked, setClicked] = useState("all");

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
    <Flex pb="10%" flexDirection="row">
      <Flex flexDirection="column" ml="25px" mt="15px">
        <FriendCard profile={true} friend={profile} />
      </Flex>
      <Flex width="75%" flexDirection="column">
        <Flex flexDirection="row" ml="30px" mb="30px">
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
        <Flex flexDirection="column">
          { clicked === "all" ?
            <Flex flexDirection="column">
              <CategoryList friend={true} title={profile.name && profile.name.split(" ")[0] + "'s Favourite Movies"} list={movieFavs} handleUpdate={handleUpdate} loading={favLoading} type="movies" action="liked" />
              <CategoryList friend={true} title={profile.name && profile.name.split(" ")[0] + "'s Favourite TV Shows"} list={tvFavs} handleUpdate={handleUpdate} loading={favLoading} type="tv shows" action="liked" />
              <CategoryList friend={true} title={profile.name && profile.name.split(" ")[0] + "'s Movie Watch List"} list={movieWatch} handleUpdate={handleUpdate} loading={watchLoading} type="movies" action="added" />
              <CategoryList friend={true} title={profile.name && profile.name.split(" ")[0] + "'s TV Show Watch List"} list={tvWatch} handleUpdate={handleUpdate} loading={watchLoading} type="tv shows" action="added" />
            </Flex>
            : clicked === "movies" ?
            <Flex flexDirection="column">
              <CategoryList friend={true} title={profile.name && profile.name.split(" ")[0] + "'s Favourite Movies"} list={movieFavs} handleUpdate={handleUpdate} loading={favLoading} type="movies" action="liked" />
              <CategoryList friend={true} title={profile.name && profile.name.split(" ")[0] + "'s Movie Watch List"} list={movieWatch} handleUpdate={handleUpdate} loading={watchLoading} type="movies" action="added" />
            </Flex>
            : clicked === "shows" ?
            <Flex flexDirection="column">
              <CategoryList friend={true} title={profile.name && profile.name.split(" ")[0] + "'s Favourite TV Shows"} list={tvFavs} handleUpdate={handleUpdate} loading={favLoading} type="tv shows" action="liked" />
              <CategoryList friend={true} title={profile.name && profile.name.split(" ")[0] + "'s TV Show Watch List"} list={tvWatch} handleUpdate={handleUpdate} loading={watchLoading} type="tv shows" action="added" />
            </Flex>
            : clicked === "favs" ?
            <Flex flexDirection="column">
              <CategoryList friend={true} title={profile.name && profile.name.split(" ")[0] + "'s Favourite Movies"} list={movieFavs} handleUpdate={handleUpdate} loading={favLoading} type="movies" action="liked" />
              <CategoryList friend={true} title={profile.name && profile.name.split(" ")[0] + "'s Favourite TV Shows"} list={tvFavs} handleUpdate={handleUpdate} loading={favLoading} type="tv shows" action="liked" />
            </Flex>
            :
            <Flex flexDirection="column">
              <CategoryList title={profile.name && profile.name.split(" ")[0] + "'s Movie Watch List"} list={movieWatch} handleUpdate={handleUpdate} loading={watchLoading} type="movies" action="added" />
              <CategoryList title={profile.name && profile.name.split(" ")[0] + "'s TV Show Watch List"} list={tvWatch} handleUpdate={handleUpdate} loading={watchLoading} type="tv shows" action="added" />
            </Flex>
          }
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FriendProfile;
