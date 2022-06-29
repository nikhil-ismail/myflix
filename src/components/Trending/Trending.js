import React from 'react';
import { Text, Flex, Heading } from "@chakra-ui/react";
import MyList from '../MyList/MyList';

const Trending = (props) => {

    const { trending } = props;

    return (
        <Flex flexDirection="column">
            <Heading ml="30px" fontSize="22px">Trending {props.title} with Friends</Heading>
            <Flex backgroundColor="lightgray" flexDirection="column" mt="15px" ml="30px" mr="30px" padding="20px" borderRadius="10px">
                {
                    trending.length === 0
                    ?
                    <Text mt="5px">There is nothing trending at the moment!</Text>
                    :
                    trending.map((item, index) => {
                        return (
                            <MyList key={index} movie={item} />
                        )
                    })
                }
            </Flex>
        </Flex>
    );
}

export default Trending;
