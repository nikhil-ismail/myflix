import React, { useState } from 'react';
import './Search.css';

const Search = (props) => {

  const handleChange = (event) => {
    if (event.target.value.length > 3) {
      props.handleQueryChange(event.target.value);
    }
  }
  
  return (
    <div className="search-container">
        <h3>Movie Title</h3>
        <input className="search-box" type="text" placeholder="Search..." onChange={handleChange} />
    </div>
  );
}

export default Search;
