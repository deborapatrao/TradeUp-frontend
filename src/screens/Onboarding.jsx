import { Heading, Center, VStack, HStack, Button } from "native-base";

const Onboarding = ({ navigation, skipAuthHandler }) => {

    return (
        <>
            <Center
                flex={1}
                px={4}
            >
                <VStack space={5} alignItems="center">
                    <Heading size="lg">Welcome to Trade Up</Heading>

                    <HStack space={3}>
                        <Button
                            onPress={() => navigation.navigate("Sign Up")}
                            colorScheme="indigo"
                        >
                            Sign up
                        </Button>
                        <Button
                            onPress={() => navigation.navigate("Sign In")}
                            colorScheme="indigo"
                        >
                            Log in
                        </Button>
                    </HStack>

                    <Button size="sm" variant="link" colorScheme="indigo" onPress={skipAuthHandler}>
                        Skip
                    </Button>
                </VStack>
            </Center>
        </>
    );
};

export default Onboarding;
