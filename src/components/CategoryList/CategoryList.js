import React from "react";
import { Text, Flex, Heading, Spinner } from "@chakra-ui/react";
import MyList from "../MyList/MyList";
import HorizontalScroll from 'react-horizontal-scrolling';

const CategoryList = (props) => {

    const { title, list, handleUpdate, loading, type, action, friend } = props;

    return (
        <Flex width="85%" flexDirection="column" ml="30px" mb="30px">
            <Heading color="#1BA098" fontSize="26px">{title}</Heading>
            <Flex borderRadius="10px" flexDirection="column">
                {loading ? <Spinner color="white" /> : list.length === 0 && friend ? (
                <Text mt="15px" color="white">No {action} {type}</Text>
                ) : list.length === 0 && !friend ? <Text mt="15px" color="white">You have not {action} any {type} yet</Text> :
                <HorizontalScroll>
                    <Flex>
                    {list.map((item, index) => {
                    return (
                        <MyList handleUpdate={handleUpdate} key={index} movie={item} />
                    )
                    })}
                    </Flex>
                </HorizontalScroll> 
                }
            </Flex>
        </Flex>
    );
};

export default CategoryList;