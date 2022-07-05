import React, { useState } from "react";
import MovieResult from "../MovieResult/MovieResult";
import { Text, Flex, Button, Heading } from "@chakra-ui/react";

const Results = (props) => {
  const { query, results } = props;

  const [more, setMore] = useState(false);

  const handleShowMore = () => {
    setMore(!more);
  }

  return (
    <Flex width="440px" backgroundColor="#718ea3" flexDirection="column" mt="10px" ml="30px" padding="25px" borderRadius="10px">
      <Heading color="#051622" fontSize="26px" mb="25px">Results for "{query}"</Heading>
      {results.length === 0 || query === "" ? (
        <Text>Your search did not have any matches.</Text>
      ) : (
        <Flex flexDirection="column">
          {more ? results.map((result, index) => {
            return (
              <MovieResult key={index} result={result} />
            )
          })
          :
          results.slice(0,4).map((result, index) => {
            return (
              <MovieResult key={index} result={result} />
            )
          })
          }
          {results.length < 3 ? <Flex></Flex> : more ? (
            <Button onClick={handleShowMore}>Show Less</Button>
          ) : (
              <Button onClick={handleShowMore}>Show More</Button>
            )
          }
        </Flex>
      )}
    </Flex>
  );
};

export default Results;
