import React from 'react';
import './Nominations.css';

const Nominations = () => {
  return (
      <div className="nominations-container">
          <h3>Nominations</h3>
          <table>
            <tr>
                <th>Title</th>
                <th>Year</th> 
                <th>Summary</th>
                <th>Remove</th>
            </tr>
            <tr>
                <td>The Amazing Spiderman</td>
                <td>2002</td> 
                <td>Peter Parker gets bitten by a spider and suddenly develops spider powers</td>
                <td><button className="remove-button">Remove</button></td>
            </tr>
            <tr>
                <td>The Amazing Spiderman 2</td>
                <td>2004</td> 
                <td>Peter Parker gets bitten by a spider and suddenly develops spider powers</td>
                <td><button className="remove-button">Remove</button></td>
            </tr>
            <tr>
                <td>The Dark Knight</td>
                <td>2008</td>
                <td>Billionare Bruce Wayne becomes the Batman and tries to defeat The Joker</td>
                <td><button className="remove-button">Remove</button></td>
            </tr>
            <tr>
                <td>The Dark Knight 2</td>
                <td>2010</td>
                <td>Billionare Bruce Wayne becomes the Batman and tries to defeat The Joker</td>
                <td><button className="remove-button">Remove</button></td>
            </tr>
            <tr>
                <td>The Dark Knight 3</td>
                <td>2012</td>
                <td>Billionare Bruce Wayne becomes the Batman and tries to defeat The Joker</td>
                <td><button className="remove-button">Remove</button></td>
            </tr>
          </table>
      </div>
  );
}

export default Nominations;
