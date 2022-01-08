import React from 'react';
import './Results.css';

const Results = (props) => {
    
    const { query, results } = props;

    const handleNominateClick = (movie) => {
        console.log('NOMNINATION ---------', movie);
    }

    return (
        <div className="results-container">
            <h3>Results for "{query}"</h3>
            {
                results.length === 0
                ?
                <p>Your search did not have any matches.</p>
                :
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Year</th> 
                        <th>Nominate</th>
                    </tr>
                    {
                        results.map((result, index) => {
                            return (
                                <tr key={index}>
                                    <td>{result.Title}</td>
                                    <td>{result.Year}</td> 
                                    <td><button className="nominate-button" onClick={handleNominateClick(result)}>Nominate</button></td>
                                </tr>
                            );
                        })
                    }
                </table>
            }
        </div>
    );
}

export default Results;
