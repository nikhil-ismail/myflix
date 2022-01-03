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

  const handleSearch = (term) => {
    setQuery(term);
    console.log('QUERY-------->');
    console.log(term);
  }

  useEffect(() => {
    axios.get(`http://www.omdbapi.com/?apikey=dffd1309&s=${query}`)
    .then(response => {
        setResults(response.data);
        console.log(results);
    })
    .catch(err => console.log(err));
  }, [query])

  return (
      <div>
        <h1>The Shoppies</h1>
        <div className="home-page">
          {
            query === ""
            ?
            <div className="searching">
              <Search handleSearch={handleSearch} />
            </div>
            :
            <div className="searching">
              <Search handleSearch={handleSearch} />
              <Results query={query} results={results} />
            </div>
          }
          <Nominations nominations={nominations} />
        </div>
      </div>
  );
}

export default Home;
