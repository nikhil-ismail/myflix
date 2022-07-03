import React from "react";
import { Button, Flex, Circle, Text, Spinner } from "@chakra-ui/react";
import ProfileTag from "../ProfileTag/ProfileTag";

const FriendCard = (props) => {

    const { friend, following, handleFollow, handleUnfollow } = props;

    let splitGenres = friend.genres && friend.genres.split(" ");
    let splitActors = friend.actors && friend.actors.split(" ");

    return (
        <Flex mb="15px" borderRadius="10px" padding="20px" backgroundColor="#DEB992" flexDirection="column">
            {props.loading ? <Spinner /> : 
            <Flex flexDirection="column">
                <Flex flexDirection="row">
                    <Circle size='50px' bg='#1BA098' color="#051622">{friend.name.split(" ")[0][0] + friend.name.split(" ")[1][0]}</Circle>
                    <Text fontSize="20px" fontWeight="bold" pr="15px" mt="10px" ml="10px" color="#051622">{friend.name}</Text>
                </Flex>
                <Flex flexDirection="row">
                    <Text mt="15px" mr="15px" fontWeight="bold">Genres</Text>
                    {splitGenres && splitGenres.map((genre, index) => {
                    return (
                        <ProfileTag key={index} value={genre} />
                    )
                    })}
                </Flex>
                <Flex flexDirection="row">
                    <Text mt="15px" mr="15px" fontWeight="bold">Actors</Text>
                    {splitActors && splitActors.map((actor, index) => {
                    return (
                        <ProfileTag key={index} value={actor} />
                    )
                    })}
                </Flex>
                {following ?
                <Flex flexDirection="column">
                    <Button mt="20px" onClick={() => props.handleRouteChange('friendProfile', friend)}>View Profile</Button>
                    <Button mt="10px" onClick={() => handleUnfollow(friend)}>Unfollow</Button>
                </Flex> :
                <Button mt="20px" onClick={() => handleFollow(friend)}>Follow</Button>
                }
            </Flex>
            }
        </Flex>
    );
};

export default FriendCard;