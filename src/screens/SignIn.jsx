import React, { useEffect, useState } from "react";
import {
	Box,
	Text,
	VStack,
	FormControl,
	Input,
	Link,
	Button,
	HStack,
	Center,
	Pressable,
	Icon,
	Divider,
	View,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action";

const SignIn = ({ navigation }) => {
	const { error } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);
	const [formData, setData] = useState({});
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		if (!formData.email && !formData.password) {
			setErrors({
				...errors,
				email: "Email is required",
				password: "Password is required",
			});
			return false;
		} else if (!formData.email && formData.password) {
			setErrors({ ...errors, email: "Email is required" });
			return false;
		} else if (formData.email && !formData.password) {
			setErrors({ ...errors, password: "Password is required" });
			return false;
		} else {
			setErrors({});
			return true;
		}
	};

	const loginHandler = () => {
		validateForm()
			? dispatch(login(formData.email, formData.password))
			: console.log("Validation Failed");
	};

	useEffect(() => {
		if (error) {
			alert(error);
			dispatch({ type: "clearError" });
		}
	}, [error, dispatch, alert]);

	// console.log("password" in errors ? "true" : "false");
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
									placeholder="example@gmail.com"
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
						<FormControl
							isRequired
							isInvalid={"password" in errors}
						>
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
										<Pressable
											onPress={() => setShow(!show)}
										>
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
							<Link
								_text={{
									fontSize: "13px",
									fontWeight: "500",
									color: "white",
								}}
								alignSelf="flex-end"
								mt="1"
							>
								Forget Password?
							</Link>
						</FormControl>
						<Button
							mt="10"
							style={styles.button}
							onPress={loginHandler}
						>
							<Text style={styles.btnText}>Sign in</Text>
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
						New to TradeUp?{" "}
					</Text>
					<Link
						_text={{
							color: "white",
							fontWeight: "medium",
							fontSize: "md",
							textDecoration: "none",
						}}
						onPress={() => navigation.navigate("Sign Up")}
					>
						Sign Up
					</Link>
				</HStack>
			</View>
		</>
	);
};

export default SignIn;

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
