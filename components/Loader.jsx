import React from "react";
import {
    Spinner,
    HStack,
    Heading,
} from "native-base";

const Loader = () => {
    return (
        <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
                Loading
            </Heading>
        </HStack>
    );
};

export default Loader;
