import React from 'react';
import './Navigation.css';
import { auth } from '../../firebase-config';
import { signOut } from '@firebase/auth';

const Navigation = (props) => {

  const logout = async () => {
    await signOut(auth);
    props.handleRouteChange('logout');
  }

  return (
      <div className="navigation">
          <h1 onClick={() => props.handleRouteChange('home')}>Movie Rank</h1>
          <h2 onClick={() => props.handleRouteChange('favourites')} className="nav-link">My Movies</h2>
          <h2 onClick={() => props.handleRouteChange('friends')} className="nav-link">Friends</h2>
          <h3 onClick={logout} className="signout-link">Log Out</h3>
      </div>
  );
}

export default Navigation;