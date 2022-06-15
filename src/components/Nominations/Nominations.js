import React from 'react';
import { Text, Flex, Button } from "@chakra-ui/react";

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
        <Flex backgroundColor="lightgray" flexDirection="column" ml="30px" mr="30px" pr="30px" pl="30px" pb="20px" borderRadius="10px">
            <h3>Trending with Friends</h3>
            {
                nominations.length === 0
                ?
                <Text>You have not nominated any movies for the Shoppies yet!</Text>
                :
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Year</th> 
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        nominations.map((nomination, index) => {
                            return (
                                <tr key={index}>
                                    <td>{nomination.title}</td>
                                    <td>{nomination.year}</td> 
                                    <td><Button>Remove</Button></td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            }
        </Flex>
    );
}

export default Nominations;
