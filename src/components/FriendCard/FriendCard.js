import React from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

const FriendCard = (props) => {

    const { friend, following, handleFollow, handleUnfollow } = props;

    return (
        <Flex mb="10px" borderRadius="10px" padding="25px" backgroundColor="white" flexDirection="column">
            <Text>{friend.name}</Text>
            <Text>{friend.genres}</Text>
            <Text>{friend.actors}</Text>
            {following ? 
            <Button onClick={() => handleUnfollow(friend)}>Unfollow</Button> : 
            <Button onClick={() => handleFollow(friend)}>Follow</Button>
            }
        </Flex>
    );
};

export default FriendCard;