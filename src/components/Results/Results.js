import React from 'react';
import './Results.css';

const Results = (props) => {
    
    const { query, results } = props;

    return (
        <div className="results-container">
            <h3>Results for "{query}"</h3>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Year</th> 
                    <th>Nominate</th>
                </tr>
                <tr>
                    <td>The Amazing Spiderman</td>
                    <td>2002</td> 
                    <td><button className="nominate-button">Nominate</button></td>
                </tr>
                <tr>
                    <td>The Dark Knight</td>
                    <td>2008</td>
                    <td><button className="nominate-button">Nominate</button></td>
                </tr>
            </table>
        </div>
    );
}

export default Results;
