import React from "react";
import "./Results.css";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";

const Results = (props) => {
  const { query, results } = props;
  const userEmail = auth.currentUser.email;
  const favouritesCollectionRef = collection(db, "favourites");
  const watchListCollectionRef = collection(db, "watch-list");

  const handleWatchList = async (film) => {
    let movie = {
      id: film.imdbID,
      image: film.Poster,
      title: film.Title,
      type: film.Type,
      year: film.Year,
    };
    await addDoc(watchListCollectionRef, { email: userEmail, movie: movie });
    console.log("Add to watch list ---------", movie);
  };

  const handleLike = async (film) => {
    let movie = {
      id: film.imdbID,
      image: film.Poster,
      title: film.Title,
      type: film.Type,
      year: film.Year,
    };
    await addDoc(favouritesCollectionRef, { email: userEmail, movie: movie });
    console.log("Add to favourites", movie);
  };

  return (
    <div className="results-container">
      <h3>Results for "{query}"</h3>
      {results.length === 0 ? (
        <p>Your search did not have any matches.</p>
      ) : (
        <table>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Add to Watch List</th>
            <th>Add to Favourites</th>
          </tr>
          {results.map((result, index) => {
            return (
              <tr key={index}>
                <td>{result.Title}</td>
                <td>{result.Year}</td>
                <td>
                  <button
                    className="nominate-button"
                    onClick={() => handleWatchList(result)}
                  >
                    Add
                  </button>
                </td>
                <td>
                  <button
                    className="nominate-button"
                    onClick={() => handleLike(result)}
                  >
                    Like
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default Results;
