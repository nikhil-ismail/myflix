import React from 'react';
import './Navigation.css';

const Navigation = (props) => {

  return (
      <div className="navigation">
          <h1 onClick={props.handleHome}>My Movies</h1>
          <h2 onClick={props.handleFavourites} className="nav-link">Favourites</h2>
          <h3 onClick={props.handleLogout} className="signout-link">Log Out</h3>
      </div>
  );
}

export default Navigation;