import React from 'react';
import { Text, Flex } from '@chakra-ui/react';

const ProfileTag = (props) => {

  const { value } = props;

  let newVal = value;
  if (newVal[newVal.length-1] === ",") {
    newVal = newVal.substring(0, newVal.length-1);
  }
  
  return (
    <Flex width={props.genres ? "100px" : "175px"} alignItems="center" justifyContent="center" borderRadius="15px" backgroundColor="#1BA098" mt="15px" mr="10px" pr="15px" pl="5px" pt="6px" pb="6px">
        <Text ml="10px">{newVal[0].toUpperCase() + newVal.substring(1, props.value.length)}</Text>
    </Flex>
  );
}

export default ProfileTag;
