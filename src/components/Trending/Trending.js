import React, { useState } from 'react';
import { Text, Flex, Heading, Button, Spinner } from "@chakra-ui/react";
import MyList from '../MyList/MyList';

const Trending = (props) => {

    const { trending } = props;

    const [resultCount, setResultCount] = useState(5);

    const handleShowMore = () => {
        let count = resultCount + 5;
        setResultCount(count);
    }

    return (
        <Flex flexDirection="column">
            <Heading color="#1BA098" ml="80px" fontSize="22px">Trending {props.title}</Heading>
            <Flex backgroundColor="#DEB992" flexDirection="column" mt="15px" ml="30px" mr="30px" padding="20px" borderRadius="10px">
                {
                    props.loading ? <Spinner /> : trending.length === 0
                    ?
                    <Text color="#051622" mt="5px">There is nothing trending at the moment!</Text>
                    :
                    trending.slice(0,resultCount).map((item, index) => {
                        return (
                            <MyList key={index} movie={item} />
                        )
                    })
                }
                {trending.length > resultCount && <Button onClick={handleShowMore}>Show More</Button>}
            </Flex>
        </Flex>
    );
}

export default Trending;
