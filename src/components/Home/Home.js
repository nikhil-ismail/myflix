import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../Search/Search';
import Results from '../Results/Results';
import Nominations from '../Nominations/Nominations';
import { Flex } from "@chakra-ui/react";

const Home = () => {

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [resultCount, setResultCount] = useState(0);

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
        <Nominations />
      </Flex>
    </Flex>
  );
}

export default Home;
