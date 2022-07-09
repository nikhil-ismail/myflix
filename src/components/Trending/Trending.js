import React from 'react';
import { Text, Flex, Heading, Spinner } from "@chakra-ui/react";
import HorizontalScroll from 'react-horizontal-scrolling';
import TrendingList from '../TrendingList/TrendingList';

const Trending = (props) => {

    const { trending } = props;

    let newTrending = [];
    let flag = false;

    for (let i = 0; i < trending.length; i++) {
        newTrending.push(trending[i].movie);
    }

    let uniqueTrending = [...new Map(newTrending.map(v => [JSON.stringify([v.title,v.year]), v])).values()]

    return (
        <Flex width="910px" ml="25px" mb="25px" flexDirection="column">
            <Heading color="#1BA098" fontSize="26px">Trending {props.title}</Heading>
            <Flex backgroundColor="#c4cfce" flexDirection="column" mt="20px" mr="30px" padding="20px" borderRadius="10px">
                {
                    props.loading ? <Spinner /> : uniqueTrending.length === 0
                    ?
                    <Text color="#051622" mt="5px">There is nothing trending at the moment!</Text>
                    :
                    <HorizontalScroll>
                    <Flex ml="5px" mr="5px">
                        {uniqueTrending.slice(0,30).map((item, index) => {
                        return (
                            <TrendingList handleUpdate={props.handleUpdate} key={index} movie={item} />
                        )
                        })}
                    </Flex>
                    </HorizontalScroll>
                }
            </Flex>
        </Flex>
    );
}

export default Trending;
