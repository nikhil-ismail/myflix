import React, { useState } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Search from "../Search/Search";

const Friends = (props) => {

  const [query, setQuery] = useState('');

  const handleQueryChange = (text) => {
    setQuery(text);
  }

  return (
    <Flex flexDirection="row">
      <Search title="Friends" handleQueryChange={handleQueryChange} />
      <Flex flexDirection="column">
        <Heading fontSize="26px" mb="25px" ml="100px">My Friends</Heading>
        <Flex borderRadius="10px" padding="25px" marginLeft="60px" backgroundColor="lightgray" flexDirection="column">
          <Text>Neel Ismail</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Friends;