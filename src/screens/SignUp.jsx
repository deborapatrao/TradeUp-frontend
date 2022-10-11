import React, { useState } from "react";
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
} from "native-base";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const auth = getAuth();

	async function registerHandler() {
		try {
			await createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// ..
				});
		} catch (error) {}
	}

	return (
		<Center w="100%">
			<Box safeArea p="2" w="90%" maxW="290" py="8">
				<VStack space={3} mt="5">
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
							!email || !password
						}
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
							Already have an account?.{" "}
						</Text>
						<Link
							_text={{
								color: "indigo.500",
								fontWeight: "medium",
								fontSize: "sm",
							}}
							onPress={() => navigation.navigate("Login")}
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
