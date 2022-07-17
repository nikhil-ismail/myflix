import React from 'react';
import { Text, Flex, Heading, Spinner } from "@chakra-ui/react";
import HorizontalScroll from 'react-horizontal-scrolling';
import TrendingList from '../TrendingList/TrendingList';

const Trending = (props) => {

    const { trending } = props;

    let newTrending = [];
    let uniqueTrending = [];
    let map = new Map();

    for (let i = 0; i < trending.length; i++) {
        newTrending.push(trending[i].movie);
    }

    for (let i = 0; i < newTrending.length; i++) {
        if (!map.get(newTrending[i].title)) {
            map.set(newTrending[i].title, {count: 1, movie: newTrending[i]});
        } else {
            let val = map.get(newTrending[i].title).count;
            map.set(newTrending[i].title, {count: val + 1, movie: newTrending[i]});
        }
    }

    const sortedMap = new Map([...map.entries()].sort((a, b) => b[1].count - a[1].count));

    for (const [key, value] of sortedMap.entries()) {
        uniqueTrending.push(value.movie);
    }


    return (
        <Flex width="910px" ml="30px" mb="30px" flexDirection="column">
            <Heading color="#1BA098" fontSize="26px">Trending {props.title}</Heading>
            <Flex flexDirection="column" mr="30px" borderRadius="10px">
                {
                    props.loading ? <Spinner /> : uniqueTrending.length === 0
                    ?
                    <Text color="#051622" mt="5px">There is nothing trending at the moment!</Text>
                    :
                    <HorizontalScroll>
                    <Flex>
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
