import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Onboarding from "../screens/Onboarding";

const Stack = createNativeStackNavigator();

export default function AuthStack({ skipAuthHandler }) {

	const { error } = useSelector((state) => state.auth);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={!error ? "Onboarding" : ""}>
				<Stack.Screen name="Sign In" component={SignIn} />
				<Stack.Screen name="Sign Up" component={SignUp} />
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
