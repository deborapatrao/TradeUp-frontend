import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Onboarding from "../screens/Onboarding";

import { useColorMode } from "native-base";
import { navigatorTheme } from "../theme";

const Stack = createNativeStackNavigator();

export default function AuthStack({ skipAuthHandler }) {
	const { colorMode } = useColorMode();

	const MyTheme = {
		colors: {
			background:
				colorMode === "dark"
					? navigatorTheme.colors.primary.bg
					: navigatorTheme.colors.secondary.white,
			text:
				colorMode === "dark"
					? navigatorTheme.colors.secondary.white
					: "black",
		},
	};

	const headerBackground =
		colorMode === "dark"
			? navigatorTheme.colors.primary.bg
			: navigatorTheme.colors.secondary.white;

	const { error } = useSelector((state) => state.auth);

	return (
		<NavigationContainer theme={MyTheme}>
			<Stack.Navigator initialRouteName={!error ? "Onboarding" : ""}>
				<Stack.Screen
					name="Sign In"
					component={SignIn}
					options={{
						headerStyle: {
							backgroundColor: headerBackground,
						},
					}}
				/>
				<Stack.Screen
					name="Sign Up"
					component={SignUp}
					options={{
						headerStyle: {
							backgroundColor: headerBackground,
						},
					}}
				/>
				<Stack.Screen
					name="Onboarding"
					options={{
						headerShown: false, // hide header
					}}
				>
					{(props) => (
						<Onboarding
							{...props}
							skipAuthHandler={skipAuthHandler}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
