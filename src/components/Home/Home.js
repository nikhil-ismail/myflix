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
  const [query, setQuery] = useState('');
  const [resultCount, setResultCount] = useState(0);
  const [movieFavs, setMovieFavs] = useState([]);
  const [tvFavs, setTvFavs] = useState([]);
  const [movieWatch, setMovieWatch] = useState([]);
  const [tvWatch, setTvWatch] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);

  const userEmail = auth.currentUser.email;

  const getFavourites = async () => {
    try {
      const q = query(collection(db, "favourites"), where("email", "!=", userEmail));
      const data = await getDocs(q);
      const favourites = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovieFavs(favourites.filter(item => item.movie.type === "movie"));
      setTvFavs(favourites.filter(item => item.movie.type === "series"));
    }
    catch(err) {
      console.log(err);
    }
  };

  const getWatchList = async () => {
      try {
        const q = query(collection(db, "watch-list"), where("email", "!=", userEmail));
        const data = await getDocs(q);
        const watchList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setMovieWatch(watchList.filter(item => item.movie.type === "movie"));
        setTvWatch(watchList.filter(item => item.movie.type === "series"));
      }
      catch(err) {
        console.log(err);
      }
  };

  const handleQueryChange = (text) => {
    setQuery(text);
  }

  const handleShowMore = () => {
    let count = resultCount + 1;
    setResultCount(count);
  }

  const handleShowLess = () => {
    let count = resultCount - 1;
    setResultCount(count);
  }

  useEffect(() => {
    getFavourites();
    getWatchList();
    setTrendingMovies(movieFavs.concat(movieWatch));
    setTrendingShows(tvFavs.concat(tvWatch));
    axios.get(`http://www.omdbapi.com/?apikey=dffd1309&s=${query}`)
    .then(response => {
        if (response.data.Response === "True") {
          if (resultCount === 1) {
            setResults(response.data.Search.slice(0,10));
          }
          else {
            setResults(response.data.Search.slice(0,5));
          }
        }
        else {
          setResultCount(0);
          setResults([]);
        }
    })
    .catch(err => {
        console.log(err);
    })
  }, [query, resultCount])

  return (
    <Flex>
      <Flex flexDirection="row">
        {
          query === ""
          ?
          <Flex flexDirection="column" width="55%">
            <Search title="Movies or TV Shows" handleQueryChange={handleQueryChange} />
          </Flex>
          :
          <Flex width="55%" flexDirection="column" className="searching">
            <Search title="Movies or TV Shows" handleQueryChange={handleQueryChange} />
            <Results query={query} results={results} resultCount={resultCount} handleShowLess={handleShowLess} handleShowMore={handleShowMore} />
          </Flex>
        }
        <Trending title="Movies" trending={trendingMovies} />
        <Trending title="Shows" trending={trendingShows} />
      </Flex>
    </Flex>
  );
}

export default Home;
