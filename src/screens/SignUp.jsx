import React, { useState, useEffect } from "react";
import {
	Box,
	Text,
    HStack,
	VStack,
	FormControl,
	Input,
	Button,
	Center,
	Link,
	Checkbox,
	Pressable,
	Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/action";
import * as Location from "expo-location";

const SignUp = ({ navigation }) => {

	const { error } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const [show, setShow] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});

			let address = await Location.reverseGeocodeAsync(location.coords);

			const userLocation = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				city: address[0].city,
				state: address[0].region,
				country: address[0].country,
			}

			setLocation(userLocation);
		})();
	}, []);

	async function registerHandler() {
		dispatch(signup(email, password, location))
	}

	useEffect(() => {
		if (error) {
			alert(error);
			dispatch({ type: "clearError" });
		}
	}, [error, dispatch, alert]);

	return (
		<Center w="100%">
			<Box safeArea p="2" w="100%" maxW="290" py="8">
				<VStack space={3} mt="5">
					<FormControl>
						<FormControl.Label>Email</FormControl.Label>
						<Input
							placeholder="Email address"
							value={email}
							onChangeText={setEmail}
							autoCapitalize="none"
						/>
					</FormControl>
					<FormControl>
						<FormControl.Label>Password</FormControl.Label>
						<Input
							placeholder="Enter your password"
							value={password}
							onChangeText={setPassword}
							type={show ? "text" : "password"}
							InputRightElement={
								<Pressable onPress={() => setShow(!show)}>
									<Icon
										as={
											<MaterialIcons
												name={
													show
														? "visibility"
														: "visibility-off"
												}
											/>
										}
										size={5}
										mr="2"
										color="muted.400"
									/>
								</Pressable>
							}
						/>
						<FormControl.HelperText>
							At least 8 characters with uppercase letters and numbers
						</FormControl.HelperText>
					</FormControl>

					<HStack space={6}>
						<Checkbox shadow={2} value="test" accessibilityLabel="Terms">
							I accept the terms &amp; conditions
						</Checkbox>
					</HStack>

					<Button
						mt="2"
						colorScheme="indigo"
						onPress={registerHandler}
					>
						Sign up
					</Button>
					<HStack mt="6" justifyContent="center">
						<Text
							fontSize="sm"
							color="coolGray.600"
							_dark={{
								color: "warmGray.200",
							}}
						>
							Already have an account?{" "}
						</Text>
						<Link
							_text={{
								color: "indigo.500",
								fontWeight: "medium",
								fontSize: "sm",
							}}
							onPress={() => navigation.navigate("Sign In")}
						>
							Sign In
						</Link>
					</HStack>
				</VStack>
			</Box>
		</Center>
	);
};

export default SignUp;
