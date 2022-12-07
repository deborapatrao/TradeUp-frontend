import {
	Heading,
	Center,
	VStack,
	HStack,
	Button,
	Image,
	Box,
	Text,
} from "native-base";
import { StyleSheet } from "react-native";
import TradeUp from "../assets/images/TradeUp_Logo_light.png";

const Onboarding = ({ navigation, skipAuthHandler }) => {
	return (
		<>
			<Center flex={1} px={3}>
				<VStack space={5} alignItems="center" mx={6}>
					<Image
						source={TradeUp}
						alt="Alternate Text"
						style={{
							width: 250,
							resizeMode: "contain",
						}}
					/>

					{/* <Heading size="lg">Welcome to Trade Up</Heading> */}

					<HStack space={3} mx={10}>
						<Button
							onPress={() => navigation.navigate("Sign Up")}
							style={styles.button}
							size="lg"
						>
							<Text style={styles.btnText}>Sign up</Text>
						</Button>
						<Button
							onPress={() => navigation.navigate("Sign In")}
							style={styles.button}
							size="lg"
						>
							<Text style={styles.btnText}>Log in</Text>
						</Button>
					</HStack>

					{/* <Button size="sm" variant="link" colorScheme="indigo" onPress={skipAuthHandler}>
                        Skip
                    </Button> */}
				</VStack>
			</Center>
		</>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#386AF5",
		flex: 1,
		borderRadius: 5,
	},
	btnText: {
		fontSize: 16,
		fontWeight: "500",
	},
});
