import React, { useState } from "react";
import {
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    Center,
    NativeBaseProvider,
} from "native-base";

const SignUp = ({ navigation }) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const registerHandler = () => {
        console.log("Register button clicked");
    }

    return (
        <Center w="100%">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading
                    size="lg"
                    color="coolGray.800"
                    _dark={{
                        color: "warmGray.50",
                    }}
                    fontWeight="semibold"
                >
                    Welcome
                </Heading>
                <Heading
                    mt="1"
                    color="coolGray.600"
                    _dark={{
                        color: "warmGray.200",
                    }}
                    fontWeight="medium"
                    size="xs"
                >
                    Sign up to continue!
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>First Name</FormControl.Label>
                        <Input
                            placeholder="Enter your first name"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Last Name</FormControl.Label>
                        <Input
                            placeholder="Enter your last name"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            placeholder="Email address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </FormControl>
                    <Button
                        mt="2"
                        colorScheme="indigo"
                        disabled={
                            !firstName || !lastName || !email || !password
                        }
                        onPress={registerHandler}
                    >
                        Sign up
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default SignUp;
