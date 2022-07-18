import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../Search/Search';
import Results from '../Results/Results';
import Trending from '../Trending/Trending';
import { Flex } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { faV } from '@fortawesome/free-solid-svg-icons';

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
      let favourites = [];
      const querySnapshot = await getDocs(collection(db, "favourites"));
      querySnapshot.forEach((doc) => {
        favourites.push({ ...doc.data(), id: doc.id })
      });
      const movieFavs = favourites.filter(item => item.movie.type === "movie");
      const tvFavs = favourites.filter(item => item.movie.type === "series");

      let watchList = [];
      const querySnapshot2 = await getDocs(collection(db, "watch-list"));
      querySnapshot2.forEach((doc) => {
        watchList.push({ ...doc.data(), id: doc.id })
      });
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
