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
  const [resultCount, setResultCount] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [movieLoading, setMovieLoading] = useState(true);
  const [tvLoading, setTvLoading] = useState(true);

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

      /*for (let i = 0; i < movies.lenght; i++) {
        if (!trendingMovies.find(item => item.movie === movies[i].movie)) {
          console.log("HEREEEEE")
          setTrendingMovies(trendingMovies.push(movies[i]));
        }
      }*/
      const movies = movieFavs.concat(movieWatch);
      setTrendingMovies(movies);
      setMovieLoading(false);
      
      /*for (let i = 0; i < shows.lenght; i++) {
        if (!trendingShows.find(item => item.movie === shows[i].movie)) {
          setTrendingShows(trendingShows.push(shows[i]));
        }
      }*/
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

  const handleShowMore = () => {
    let count = resultCount + 1;
    setResultCount(count);
  }

  const handleShowLess = () => {
    let count = resultCount - 1;
    setResultCount(count);
  }

  useEffect(() => {
    axios.get(`http://www.omdbapi.com/?apikey=dffd1309&s=${searchQuery}`)
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
    getTrending();
  }, [searchQuery, resultCount])

  return (
    <Flex>
      <Flex flexDirection="row">
        {
          searchQuery === ""
          ?
          <Flex flexDirection="column" width="55%">
            <Search title="Movies or TV Shows" handleQueryChange={handleQueryChange} />
          </Flex>
          :
          <Flex width="55%" flexDirection="column" className="searching">
            <Search title="Movies or TV Shows" handleQueryChange={handleQueryChange} />
            <Results query={searchQuery} results={results} resultCount={resultCount} handleShowLess={handleShowLess} handleShowMore={handleShowMore} />
          </Flex>
        }
        <Trending loading={movieLoading} title="Movies" trending={trendingMovies} />
        <Trending loading={tvLoading} title="Shows" trending={trendingShows} />
      </Flex>
    </Flex>
  );
}

export default Home;
