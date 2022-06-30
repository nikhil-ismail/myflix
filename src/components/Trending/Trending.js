import React, { useState } from 'react';
import { Text, Flex, Heading, Button } from "@chakra-ui/react";
import MyList from '../MyList/MyList';

const Trending = (props) => {

    const { trending } = props;
    let uniqueTrending = [];
    let count = 0;

    for (let i = 0; i < trending.length; i++) {
        for (let j = 0; j < trending.length; j++) {
            if (trending[i].movie === trending[j].movie) {
                count++;
            }
        }
        if (count <= 1) {
            uniqueTrending.push(trending[i]);
        }
        count = 0;
    }

    console.log("data-----", trending);
    console.log("unique-----", uniqueTrending);


    const [resultCount, setResultCount] = useState(5);

    const handleShowMore = () => {
        let count = resultCount + 5;
        setResultCount(count);
    }

    return (
        <Flex flexDirection="column">
            <Heading ml="80px" fontSize="22px">Trending {props.title}</Heading>
            <Flex backgroundColor="lightgray" flexDirection="column" mt="15px" ml="30px" mr="30px" padding="20px" borderRadius="10px">
                {
                    uniqueTrending.length === 0
                    ?
                    <Text mt="5px">There is nothing trending at the moment!</Text>
                    :
                    uniqueTrending.slice(0,resultCount).map((item, index) => {
                        return (
                            <MyList key={index} movie={item} />
                        )
                    })
                }
                {uniqueTrending.length > resultCount && <Button onClick={handleShowMore}>Show More</Button>}
            </Flex>
        </Flex>
    );
}

export default Trending;
