import React, { useState } from 'react';
import './Search.css';

const Search = (props) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleClick = () => {
    console.log('SEARCH TERM --------');
    console.log(searchTerm);
    props.handleSearch(searchTerm);

  }
  
  return (
    <div className="search-container">
        <h3>Movie Title</h3>
        <input className="search-box" type="text" placeholder="Search..." onChange={handleChange} />
        <button className="search-button" onClick={handleClick}>Search</button>
    </div>
  );
}

export default Search;
