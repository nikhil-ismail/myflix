import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../Search/Search';
import Results from '../Results/Results';
import './Home.css';
import Nominations from '../Nominations/Nominations';

const Home = () => {

  const [nominations, setNominations] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const handleQueryChange = (text) => {
    setQuery(text);
  }

  useEffect(() => {
    console.log('QUERY---------');
    console.log(query);
    axios.get(`http://www.omdbapi.com/?apikey=dffd1309&s=${query}`)
    .then(response => {
        if (response.data.Response === "True") {
          setResults(response.data.Search);
          console.log(results);
        }
        else {
          setResults([]);
          console.log(results);
        }
    })
    .catch(err => {
        console.log('ERROR FOUND---------')
        console.log(err);
    })
  }, [query])

  return (
      <div>
        <h1>The Shoppies</h1>
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
          <Nominations nominations={nominations} />
        </div>
      </div>
  );
}

export default Home;
