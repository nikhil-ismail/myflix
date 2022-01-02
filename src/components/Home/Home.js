import React from 'react';
import Search from '../Search/Search';
import Results from '../Results/Results';
import './Home.css';
import Nominations from '../Nominations/Nominations';

const Home = () => {
  return (
      <div>
          <h1>The Shoppies</h1>
          <div className="home-page">
              <div className="searching">
                <Search />
                <Results />
              </div>
              <Nominations />
        </div>
      </div>
  );
}

export default Home;
