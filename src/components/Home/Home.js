import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Search from '../Search/Search';
import Results from '../Results/Results';
import Nominations from '../Nominations/Nominations';

const Home = () => {

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const handleQueryChange = (text) => {
    setQuery(text);
  }

  useEffect(() => {
    axios.get(`http://www.omdbapi.com/?apikey=dffd1309&s=${query}`)
    .then(response => {
        if (response.data.Response === "True") {
          setResults(response.data.Search);
        }
        else {
          setResults([]);
        }
    })
    .catch(err => {
        console.log(err);
    })
  }, [query])

  return (
    <div>
      <div className="home-page">
        {
          query === ""
          ?
          <div className="searching">
            <Search handleQueryChange={handleQueryChange} />
          </div>
          :
          <div className="searching">
            <Search handleQueryChange={handleQueryChange} />
            <Results query={query} results={results} />
          </div>
        }
        <Nominations />
      </div>
    </div>
  );
}

export default Home;
