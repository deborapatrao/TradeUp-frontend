import { Heading, Center, VStack, HStack, Button } from "native-base";

const Onboarding = () => {
    return (
        <>
            <Center
                _light={{
                    bg: "coolGray.50",
                }}
                _dark={{
                    bg: "blueGray.900",
                }}
                flex={1}
                px={4}
            >
                <VStack space={5} alignItems="center">
                    <Heading size="lg">Welcome to Trade Up</Heading>

                    <HStack space={3}>
                        <Button
                            onPress={() => console.log("Sign up is pressed")}
                        >
                            Sign up
                        </Button>
                        <Button
                            onPress={() => console.log("Log in is pressed")}
                        >
                            Log in
                        </Button>
                    </HStack>

                    <Button size="sm" variant="link">
                        Skip
                    </Button>
                </VStack>
            </Center>
        </>
    );
};

export default Onboarding;
