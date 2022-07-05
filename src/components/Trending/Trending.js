import React from 'react';
import { Text, Flex, Heading, Spinner } from "@chakra-ui/react";
import MyList from '../MyList/MyList';
import HorizontalScroll from 'react-horizontal-scrolling';

const Trending = (props) => {

    const { trending } = props;

    console.log(trending);

    return (
        <Flex width="910px" ml="25px" mb="25px" flexDirection="column">
            <Heading color="#1BA098" fontSize="26px">Trending {props.title}</Heading>
            <Flex backgroundColor="#718ea3" flexDirection="column" mt="20px" mr="30px" padding="20px" borderRadius="10px">
                {
                    props.loading ? <Spinner /> : trending.length === 0
                    ?
                    <Text color="#051622" mt="5px">There is nothing trending at the moment!</Text>
                    :
                    <HorizontalScroll>
                    {trending.slice(0,30).map((item, index) => {
                    return (
                        <MyList handleUpdate={props.handleUpdate} key={index} movie={item} />
                    )
                    })}
                    </HorizontalScroll>
                }
            </Flex>
        </Flex>
    );
}

export default Trending;
