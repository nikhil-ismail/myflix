import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../Search/Search';
import Results from '../Results/Results';
import Nominations from '../Nominations/Nominations';
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { Flex } from "@chakra-ui/react";

const Home = () => {

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [resultCount, setResultCount] = useState(0);
  const [favourites, setFavourites] = useState([]);
  const [watchList, setWatchList] = useState([]);

  const userEmail = auth.currentUser.email;

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
    const getFavourites = async () => {
      try {
        const q = query(collection(db, "favourites"), where("email", "==", userEmail));
        const data = await getDocs(q);
        setFavourites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      catch(err) {
        //console.log(err);
      }
    };
    const getWatchList = async () => {
      try {
        const q = query(collection(db, "watch-list"), where("email", "==", userEmail));
        const data = await getDocs(q);
        setWatchList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      catch(err) {
        //console.log(err);
      }
    };
    getFavourites();
    getWatchList();

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
            <Search handleQueryChange={handleQueryChange} />
          </Flex>
          :
          <Flex width="55%" flexDirection="column" className="searching">
            <Search handleQueryChange={handleQueryChange} />
            <Results favourites={favourites} watchList={watchList} query={query} results={results} resultCount={resultCount} handleShowLess={handleShowLess} handleShowMore={handleShowMore} />
          </Flex>
        }
        <Nominations />
      </Flex>
    </Flex>
  );
}

export default Home;
