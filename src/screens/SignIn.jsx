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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

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

	const validateEmail = () => {
		if (formData.email === undefined) {
			setErrors({ ...errors, email: "Email is required" });
			return false;
		}

		return true;
	};

	const validatePassword = () => {
		if (formData.password === undefined) {
			setErrors({ ...errors, password: "Password is required" });
			return false;
		}

		return true;
	};

	const loginHandler = () => {
		validateEmail()
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
		<Center w="100%">
			<Box p="2" py="8" w="90%" maxW="290">
				<VStack space={3} mt="5">
					<FormControl isRequired isInvalid={"email" in errors}>
						<FormControl.Label>Email</FormControl.Label>
						<Input
							placeholder="example@gmail.com"
							onChangeText={(value) =>
								setData({ ...formData, email: value })
							}
							autoCapitalize="none"
						/>
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
						<Input
							placeholder="Enter your password"
							// value={formData.password}
							onChangeText={(value) =>
								setData({ ...formData, password: value })
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
						/>
						{"password" in errors ? (
							<FormControl.ErrorMessage>
								{errors.password}
							</FormControl.ErrorMessage>
						) : (
							""
						)}
						<Link
							_text={{
								fontSize: "xs",
								fontWeight: "500",
								color: "indigo.500",
							}}
							alignSelf="flex-end"
							mt="1"
						>
							Forget Password?
						</Link>
					</FormControl>
					<Button mt="2" colorScheme="indigo" onPress={loginHandler}>
						Sign in
					</Button>
					<HStack mt="6" justifyContent="center">
						<Text
							fontSize="sm"
							color="coolGray.600"
							_dark={{
								color: "warmGray.200",
							}}
						>
							New to TradeUp?{" "}
						</Text>
						<Link
							_text={{
								color: "indigo.500",
								fontWeight: "medium",
								fontSize: "sm",
							}}
							onPress={() => navigation.navigate("Sign Up")}
						>
							Sign Up
						</Link>
					</HStack>
				</VStack>
			</Box>
		</Center>
	);
};

export default SignIn;
