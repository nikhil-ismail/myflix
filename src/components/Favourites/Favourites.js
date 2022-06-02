import React, { useState, useEffect } from 'react';
import './Favourites.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../firebase-config';

const Favourites = () => {

    const [favourites, setFavourites] = useState([]);
    const [watchList, setWatchList] = useState([]);

    const userEmail = auth.currentUser.email;

    useEffect(() => {
        const getFavourites = async () => {
            const q = query(collection(db, "favourites"), where("email", "==", userEmail));
            const data = await getDocs(q);
            setFavourites(data.docs.map((doc) => ({ ...doc.data() })));
        };
        const getWatchList = async () => {
            const q = query(collection(db, "watch-list"), where("email", "==", userEmail));
            const data = await getDocs(q);
            setWatchList(data.docs.map((doc) => ({ ...doc.data() })));
        };

        getFavourites();
        getWatchList();
    }, [])

    return (
        <div className="favourites-container">
            <div className="category-container">
            <h3>Favourite Movies</h3>
            {
                favourites.length === 0
                ?
                <p>You have not liked any movies yet!</p>
                :
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Year</th> 
                        <th>Remove</th>
                    </tr>
                    {
                        favourites.map((favourite, index) => {
                            return (
                                <tr key={index}>
                                    <td>{favourite.movie.title}</td>
                                    <td>{favourite.movie.year}</td> 
                                    <td><button className="remove-button">Remove</button></td>
                                </tr>
                            );
                        })
                    }
                </table>
            }
            </div>
            <div className="category-container">
            <h3>My Watch List</h3>
            {
                watchList.length === 0
                ?
                <p>You have not added any movies to your watch list yet!</p>
                :
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Year</th> 
                        <th>Remove</th>
                    </tr>
                    {
                        watchList.map((watch, index) => {
                            return (
                                <tr key={index}>
                                    <td>{watch.movie.title}</td>
                                    <td>{watch.movie.year}</td> 
                                    <td><button className="remove-button">Remove</button></td>
                                </tr>
                            );
                        })
                    }
                </table>
            }
            </div>
        </div>
    );
}

export default Favourites;
