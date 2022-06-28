import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

const FriendCard = (props) => {

    const { friend } = props;

    return (
        <Flex mb="10px" borderRadius="10px" padding="25px" backgroundColor="white" flexDirection="column">
            <Text>{friend.name}</Text>
            <Text>{friend.genres}</Text>
            <Text>{friend.actors}</Text>
        </Flex>
    );
};

export default FriendCard;