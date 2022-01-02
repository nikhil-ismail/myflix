import React from 'react';
import './Results.css';

const Results = () => {
  return (
      <div className="results-container">
          <h3>Results for "the"</h3>
          <table>
            <tr>
                <th>Title</th>
                <th>Year</th> 
                <th>Summary</th>
                <th>Nominate</th>
            </tr>
            <tr>
                <td>The Amazing Spiderman</td>
                <td>2002</td> 
                <td>Peter Parker gets bitten by a spider and suddenly develops spider powers</td>
                <td><button className="nominate-button">Nominate</button></td>
            </tr>
            <tr>
                <td>The Dark Knight</td>
                <td>2008</td>
                <td>Billionare Bruce Wayne becomes the Batman and tries to defeat The Joker</td>
                <td><button className="nominate-button">Nominate</button></td>
            </tr>
          </table>
      </div>
  );
}

export default Results;
