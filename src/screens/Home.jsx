import React, { useEffect } from 'react'
import {
    Box,
    Heading,
    VStack,
    Button,
    Center,
} from "native-base";

import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../redux/action";

const Home = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state=>state.auth)

    const logoutHandler = () => {
        dispatch(logout())
    };

    return (
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading
                    size="lg"
                    fontWeight="600"
                    color="coolGray.800"
                    _dark={{
                        color: "warmGray.50",
                    }}
                >
                    { `Welcome ${user.firstName} ${user.lastName}` }
                </Heading>
                <Heading
                    mt="1"
                    _dark={{
                        color: "warmGray.200",
                    }}
                    color="coolGray.600"
                    fontWeight="medium"
                    size="xs"
                >

                </Heading>

                <VStack space={3} mt="5">
                    <Button
                        mt="2"
                        colorScheme="indigo"
                        onPress={logoutHandler}
                    >
                        Logout
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default Home;
