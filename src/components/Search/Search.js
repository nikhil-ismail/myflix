import React from 'react';
import './Search.css';

const Search = () => {
  return (
      <div className="search-container">
          <h3>Movie Title</h3>
          <input className="search-box" type="text" placeholder="Search..." />
          <button className="search-button">Search</button>
      </div>
  );
}

export default Search;
