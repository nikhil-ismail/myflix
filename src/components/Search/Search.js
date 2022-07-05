import React from 'react';
import { Input, Flex, Icon, Box } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

const Search = (props) => {

  const handleChange = (event) => {
    if (event.target.value.length > 3) {
      props.handleQueryChange(event.target.value);
    }
  }
  
  return (
    <Flex width="488px" flexDirection="row" ml="7px" mr="30px" padding="25px">
      <Flex width="100%" backgroundColor="#718ea3" flexDirection="row" borderWidth="1px" justifyContent="center" alignItems="center" p="5px" borderRadius="10px">
        <Icon w={5} h={5} ml="10px" mr="5px" as={BsSearch} />
        <Input onFocus="none" padding="10px" fontSize="15px" border="none" type="text" placeholder="Search movies or tv shows..." onChange={handleChange} />
      </Flex>
    </Flex>
  );
}

export default Search;
