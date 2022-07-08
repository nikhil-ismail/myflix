import React from "react";
import { Button, Flex, Circle, Text, Spinner } from "@chakra-ui/react";
import ProfileTag from "../ProfileTag/ProfileTag";

const FriendCard = (props) => {

    const { profile, friend, following, handleFollow, handleUnfollow } = props;

    let splitGenres = friend.genres && friend.genres.split(" ");
    let splitActors = friend.actors && friend.actors.split(" ");
    let fullActors = [];

    for (let i = 0; i < splitActors.length - 1; i = i + 2) {
        let data = splitActors.slice(i, i + 2).join(" ");
        data = data.split(" ");
        let first = data[0][0].toUpperCase() + data[0].substring(1, data[0].length) + " ";
        let last = data[1][0].toUpperCase() + data[1].substring(1, data[1].length);
        fullActors.push(first.concat(last));
    }

    return (
        <Flex height={profile && "200px"} cursor={following && "pointer"} _hover={{ boxShadow:'dark-lg', rounded:'md', borderRadius: '10px', padding: "15px" }} maxWidth="450px" mb="15px" mr="10px" borderRadius="10px" padding="15px" backgroundColor="#c4cfce" flexDirection="column">
            {props.loading ? <Spinner /> :
            profile ?
            <Flex flexDirection="column" onClick={following ? () => props.handleRouteChange('friendProfile', friend) : null}>
                <Flex flexDirection="row">
                    <Circle size='50px' bg='#1BA098' color="#051622">{friend.name.split(" ")[0][0].toUpperCase() + friend.name.split(" ")[1][0].toUpperCase()}</Circle>
                    <Text fontSize="20px" fontWeight="bold" pr="15px" mt="10px" ml="10px" color="#051622">{friend.name.split(" ")[0][0].toUpperCase() + friend.name.split(" ")[0].substring(1, friend.name.split(" ")[0].length) + " " + friend.name.split(" ")[1][0].toUpperCase() + friend.name.split(" ")[1].substring(1, friend.name.split(" ")[1].length)}</Text>
                </Flex>
                <Flex flexDirection="row">
                    <Text mt="20px" mr="15px" fontWeight="bold">Genres</Text>
                    {splitGenres && splitGenres.map((genre, index) => {
                    return (
                        <ProfileTag key={index} value={genre} />
                    )
                    })}
                </Flex>
                <Flex flexDirection="row">
                    <Text mt="20px" mr="15px" fontWeight="bold">Actors</Text>
                    {fullActors && fullActors.map((actor, index) => {
                    return (
                        <ProfileTag key={index} value={actor} />
                    )
                    })}
                </Flex>
            </Flex>
            :
            <Flex height="100%"  flexDirection="column">
                <Flex flexDirection="column" onClick={following ? () => props.handleRouteChange('friendProfile', friend) : null}>
                    <Flex flexDirection="row">
                        <Circle size='50px' bg='#1BA098' color="#051622">{friend.name.split(" ")[0][0].toUpperCase() + friend.name.split(" ")[1][0].toUpperCase()}</Circle>
                        <Text fontSize="20px" fontWeight="bold" pr="15px" mt="10px" ml="10px" color="#051622">{friend.name.split(" ")[0][0].toUpperCase() + friend.name.split(" ")[0].substring(1, friend.name.split(" ")[0].length) + " " + friend.name.split(" ")[1][0].toUpperCase() + friend.name.split(" ")[1].substring(1, friend.name.split(" ")[1].length)}</Text>
                    </Flex>
                </Flex>
                {following ?
                <Flex mt="15px" alignItems="center" flexDirection="column">
                    <Button width="125px" borderRadius="20px" onClick={() => handleUnfollow(friend)}>Unfollow</Button>
                </Flex>
                :
                <Flex mt="15px" justifyContent="center">
                    <Button width="125px" borderRadius="20px" onClick={() => handleFollow(friend)}>Follow</Button>
                </Flex>
                }
            </Flex>
            }
        </Flex>
    );
};

export default FriendCard;