import React, { useState } from 'react';
import './Nominations.css';

const Nominations = (props) => {

    //const { nominations } = props;

    const nominations = [
        {title:"The Amazing Spiderman", year:"2002", summary:"Peter Parker gets bitten by a spider and suddenly develops spider powers"},
        {title:"The Amazing Spiderman 2", year:"2004", summary:"Peter Parker gets bitten by a spider and suddenly develops spider powers"},
        {title:"The Dark Knight", year:"2008", summary:"Billionare Bruce Wayne becomes the Batman and tries to defeat The Joker"},
        {title:"The Dark Knight 2", year:"2010", summary:"Billionare Bruce Wayne becomes the Batman and tries to defeat The Joker"},
        {title:"The Dark Knight 3", year:"2012", summary:"Billionare Bruce Wayne becomes the Batman and tries to defeat The Joker"}
    ];

    return (
        <div className="nominations-container">
            <h3>Nominations</h3>
            {
                nominations.length === 0
                ?
                <p>You have not nominated any movies for the Shoppies yet!</p>
                :
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Year</th> 
                        <th>Remove</th>
                    </tr>
                    {
                        nominations.map((nomination, index) => {
                            return (
                                <tr key={index}>
                                    <td>{nomination.title}</td>
                                    <td>{nomination.year}</td> 
                                    <td><button className="remove-button">Remove</button></td>
                                </tr>
                            );
                        })
                    }
                </table>
            }
        </div>
    );
}

export default Nominations;
