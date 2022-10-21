import { useNavigation } from "@react-navigation/native";
import { Heading, Center, VStack, HStack, Button } from "native-base";

const Onboarding = ({ navigation, skipAuthHandler }) => {

    // const navigation = useNavigation()
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
