import React from 'react';
import { Text, Flex, Heading, Spinner } from "@chakra-ui/react";
import HorizontalScroll from 'react-horizontal-scrolling';
import TrendingList from '../TrendingList/TrendingList';
import MyList from "../MyList/MyList";

const Trending = (props) => {

    const { trending } = props;

    let map1 = new Map();
    let trend = [];

    for (let i = 0; i < trending.length; i++) {
        if (!map1.get(trending[i].movie.title)) {
            map1.set(trending[i].movie.title, {count: 1, movie: trending[i]});
        } else {
            let val = map1.get(trending[i].movie.title).count;
            map1.set(trending[i].movie.title, {count: val + 1, movie: trending[i]});
        } 
    }

    const sortedMap2 = new Map([...map1.entries()].sort((a, b) => b[1].count - a[1].count));

    for (const [key, value] of sortedMap2.entries()) {
        trend.push(value.movie);
    }

    return (
        <Flex width="910px" ml="30px" mb="30px" flexDirection="column">
            <Heading color="#1BA098" fontSize="26px">Trending {props.title}</Heading>
            <Flex flexDirection="column" mr="30px" borderRadius="10px">
                {
                    props.loading ? <Spinner color="white" /> : trend.length === 0
                    ?
                    <Text color="#051622" mt="5px">There is nothing trending at the moment!</Text>
                    :
                    <HorizontalScroll>
                    <Flex>
                        {trend.slice(0,30).map((item, index) => {
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
