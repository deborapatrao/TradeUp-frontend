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
	Divider,
	View
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/action";
import * as Location from "expo-location";
import { StyleSheet } from "react-native";

const SignUp = ({ navigation }) => {

	const { error } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const [show, setShow] = useState(false);
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [formData, setData] = useState({terms: false});
	const [errors, setErrors] = useState({});

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

	const validateForm = () => {

		console.log(formData.email, formData.password, formData.terms);
		
		if (!formData.email && !formData.password && !formData.terms) {
			setErrors({
				...errors,
				email: "Email is required",
				password: "Password is required",
				terms: "Please accept terms and conditions",
			});
			return false;
		} else if (formData.email && !formData.password && !formData.terms) {
			setErrors({ ...errors, password: "Password is required", terms: "Please accept terms and conditions"});
			return false;
		} else if (formData.email && formData.password && !formData.terms) {
			setErrors({ ...errors, terms: "Please accept terms and conditions"});
			return false;
		} else if (formData.email && !formData.password && formData.terms) {
			setErrors({ ...errors, password: "Password is required"});
			return false;
		} else if (!formData.email && formData.password && formData.terms) {
			setErrors({ ...errors, email: "Email is required"});
			return false;
		} else if (!formData.email && formData.password && !formData.terms) {
			setErrors({ ...errors, email: "Email is required", terms: "Please accept terms and conditions"});
			return false;
		} else if (!formData.email && !formData.password && formData.terms) {
			setErrors({ ...errors, email: "Email is required", password: "Password is required"});
			return false;
		} else {
			setErrors({});
			return true;
		}
	};

	async function registerHandler() {
		validateForm()
		? dispatch(signup(formData.email, formData.password, location))
		: "";
	}

	useEffect(() => {
		if (error) {
			alert(error);
			dispatch({ type: "clearError" });
		}
	}, [error, dispatch, alert]);

	return (
		<>
		<Divider />
		<Center w="100%" marginTop={12}>
			<Box px="6" w="100%">
				<VStack space={3} mt="5">
					<FormControl isRequired isInvalid={"email" in errors}>
						<FormControl.Label>Email</FormControl.Label>
						<View style={styles.input}>
							<Input
								placeholder="Email address"
								onChangeText={(value) =>
									setData({ ...formData, email: value })
								}
								autoCapitalize="none"
								variant={"unstyled"}
								style={styles.inputText}
							/>		
						</View>
						{"email" in errors ? (
							<FormControl.ErrorMessage>
								{errors.email}
							</FormControl.ErrorMessage>
						) : (
							""
						)}
					</FormControl>
					<FormControl isRequired isInvalid={"password" in errors}>
						<FormControl.Label>Password</FormControl.Label>
						<View style={styles.input}>
							<Input
								placeholder="Enter your password"
								onChangeText={(value) =>
									setData({
										...formData,
										password: value,
									})
								}
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
								variant={"unstyled"}
								style={styles.inputText}
							/>
						</View>
						{"password" in errors ? (
							<FormControl.ErrorMessage>
								{errors.password}
							</FormControl.ErrorMessage>
						) : (
							""
						)}
						<FormControl.HelperText>
							At least 8 characters with uppercase letters and numbers
						</FormControl.HelperText>
					</FormControl>

					<HStack mt="5" space={6}>
						<FormControl isRequired isInvalid={"terms" in errors}>
							<Checkbox 
								shadow={2}
								onChange={(value) =>
									setData({
										...formData,
										terms: value,
									})
								}
								accessibilityLabel="Terms"
							>
								<Text style={{fontSize:14}}>Accept Terms of Use &amp; Privacy Policy</Text>
							</Checkbox>
							{"terms" in errors ? (
								<FormControl.ErrorMessage>
									{errors.terms}
								</FormControl.ErrorMessage>
							) : (
								""
							)}
						</FormControl>

					</HStack>

					<Button
						mt="5"
						style={styles.button}
						onPress={registerHandler}
					>
						Sign up
					</Button>
				</VStack>
			</Box>
		</Center>

		<View style={styles.bottomView}>
			<HStack justifyContent="center">
				<Text
					fontSize="md"
					color="white"
					_dark={{
						color: "white",
					}}
				>
					Already have an account?{" "}
				</Text>
				<Link
					_text={{
						color: "white",
						fontWeight: "medium",
						fontSize: "md",
						textDecoration: "none",
					}}
					onPress={() => navigation.navigate("Sign In")}
				>
					Sign In
				</Link>
			</HStack>
		</View>
		</>

	);
};

export default SignUp;

const styles = StyleSheet.create({
	input: {
		backgroundColor: "#231D30",
		borderColor: "#231D30",
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 5,
		paddingLeft: 5,
		color: "#CCCCCC",
	},
	inputText: {
		color: "#CCCCCC",
		fontSize: 14,
	},
	button: {
		backgroundColor: "#386AF5",
		borderRadius: 5,
	},
	btnText: {
		fontSize: 16,
		fontWeight: "500",
	},
	bottomView: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 45,
	},
});
