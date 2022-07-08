import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../Search/Search';
import Results from '../Results/Results';
import Trending from '../Trending/Trending';
import { Flex } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase-config";

const Home = () => {

  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [movieLoading, setMovieLoading] = useState(true);
  const [tvLoading, setTvLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  const userEmail = auth.currentUser.email;

  const getTrending = async () => {
    try {
      const q = query(collection(db, "favourites"), where("email", "!=", userEmail));
      const data = await getDocs(q);
      const favourites = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const movieFavs = favourites.filter(item => item.movie.type === "movie");
      const tvFavs = favourites.filter(item => item.movie.type === "series");

      const q2 = query(collection(db, "watch-list"), where("email", "!=", userEmail));
      const data2 = await getDocs(q2);
      const watchList = data2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const movieWatch = watchList.filter(item => item.movie.type === "movie");
      const tvWatch = watchList.filter(item => item.movie.type === "series");

      const movies = movieFavs.concat(movieWatch);
      setTrendingMovies(movies);
      setMovieLoading(false);
      
      const shows = tvFavs.concat(tvWatch);
      setTrendingShows(shows);
      setTvLoading(false); 
    }
    catch(err) {
      console.log(err);
    }
  }

  const handleQueryChange = (text) => {
    setSearchQuery(text);
  }

  const handleUpdate = () => {
    setUpdate(!update);
  }

  useEffect(() => {
    axios.get(`http://www.omdbapi.com/?apikey=dffd1309&s=${searchQuery}`)
    .then(response => {
        if (response.data.Response === "True") {
          setResults(response.data.Search.slice(0,8));
        }
        else {
          setResults([]);
        }
    })
    .catch(err => {
        console.log(err);
    })
    getTrending();
  }, [searchQuery])

  console.log(results);

  return (
    <Flex>
      <Flex flexDirection="row">
        {
          searchQuery === ""
          ?
          <Flex width="500px" pt="10px" flexDirection="column">
            <Search title="Movies or TV Shows" handleQueryChange={handleQueryChange} />
            <Results query="" results={[]} />
          </Flex>
          :
          <Flex width="500px" pt="10px" flexDirection="column" className="searching">
            <Search title="Movies or TV Shows" handleQueryChange={handleQueryChange} />
            <Results query={searchQuery} results={results} />
          </Flex>
        }
        <Flex flexDirection="column">
          <Trending handleUpdate={handleUpdate} loading={movieLoading} title="Movies" trending={trendingMovies} />
          <Trending handleUpdate={handleUpdate} loading={tvLoading} title="Shows" trending={trendingShows} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Home;
