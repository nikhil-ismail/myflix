import React from 'react';
import { Input, Flex, Heading } from '@chakra-ui/react';

const Search = (props) => {

  const handleChange = (event) => {
    if (event.target.value.length > 3) {
      props.handleQueryChange(event.target.value);
    }
  }
  
  return (
    <Flex backgroundColor="lightgray" flexDirection="column" ml="30px" mr="30px" padding="25px" borderRadius="10px">
        <Heading fontSize="26px" mb="15px">Search Movies or TV Shows</Heading>
        <Input padding="10px" fontSize="15px" borderRadius="10px" borderWidth="1px" borderColor="black" type="text" placeholder="Search..." onChange={handleChange} />
    </Flex>
  );
}

export default Search;
