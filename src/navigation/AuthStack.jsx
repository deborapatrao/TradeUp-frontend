import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Onboarding from "../screens/Onboarding";

import { useColorMode, Button, Text } from "native-base";
import { navigatorTheme } from "../theme";
import { TouchableOpacity } from "react-native";
import { navigationRef } from './RootNavigation';
import { AntDesign } from '@expo/vector-icons';

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
		<NavigationContainer theme={MyTheme} ref={navigationRef}>
			<Stack.Navigator 
				initialRouteName={!error ? "Onboarding" : ""}
				screenOptions={{
					headerStyle: {
						backgroundColor: headerBackground,
						borderBottomWidth: 1,
						borderBottomColor: "#fff",
					},
					headerBackVisible:false,
					headerLeft: () => null,
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			>
				<Stack.Screen
					name="Sign In"
					component={SignIn}
					options={{
						title: "Sign In",
						headerBackVisible:false,
						headerLeft: () => null,
						headerRight: () => (
							<TouchableOpacity
								onPress={() => navigationRef.navigate("Onboarding")}
							>
								<AntDesign name="close" size={24} color="white" />
							</TouchableOpacity>
						),
					}}
				/>
				<Stack.Screen
					name="Sign Up"
					component={SignUp}
					options={{
						headerBackVisible:false,
						headerLeft: () => null,
						headerRight: () => (
							<TouchableOpacity
								onPress={() => navigationRef.navigate("Onboarding")}
							>
								<AntDesign name="close" size={24} color="white" />
							</TouchableOpacity>
						),
					}}
				/>
				<Stack.Screen
					name="Onboarding"
					options={{
						headerShown: false,
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
