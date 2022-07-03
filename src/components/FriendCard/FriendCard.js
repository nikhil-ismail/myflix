import React from "react";
import { Button, Flex, Circle, Text } from "@chakra-ui/react";

const FriendCard = (props) => {

    const { friend, following, handleFollow, handleUnfollow } = props;

    return (
        <Flex mb="10px" borderRadius="10px" padding="25px" backgroundColor="white" flexDirection="column">
            <Circle size='40px' bg='#1BA098' color="#051622">{friend.name.split(" ")[0][0] + friend.name.split(" ")[1][0]}</Circle>
            <Text>{friend.name}</Text>
            <Text>{friend.genres}</Text>
            <Text>{friend.actors}</Text>
            {following ?
            <Flex flexDirection="column">
                <Button mt="10px" onClick={() => props.handleRouteChange('friendProfile', friend)}>View Profile</Button>
                <Button mt="15px" onClick={() => handleUnfollow(friend)}>Unfollow</Button>
            </Flex> :
            <Button mt="15px" onClick={() => handleFollow(friend)}>Follow</Button>
            }
        </Flex>
    );
};

export default FriendCard;