import React from "react";
import MovieResult from "../MovieResult/MovieResult";
import { Text, Flex, Button, Heading } from "@chakra-ui/react";

const Results = (props) => {
  const { query, results } = props;

  return (
    <Flex width="440px" backgroundColor="#DEB992" flexDirection="column" mt="20px" ml="30px" padding="25px" borderRadius="10px">
      <Heading color="#051622" fontSize="26px" mb="25px">Results for "{query}"</Heading>
      {results.length === 0 && props.resultCount === 0 ? (
        <Text>Your search did not have any matches.</Text>
      ) : (
        <Flex flexDirection="column">
          {results.map((result, index) => {
            return (
              <MovieResult key={index} result={result} />
            )
          })}
          {props.resultCount === 1 ? (
            <Button onClick={() => props.handleShowMore()}>Show More</Button>
          ) : (
              <Button onClick={() => props.handleShowLess()}>Show Less</Button>
            )
          }
        </Flex>
      )}
    </Flex>
  );
};

export default Results;
