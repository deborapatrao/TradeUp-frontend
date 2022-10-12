import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Onboarding from "../screens/Onboarding";

const Stack = createNativeStackNavigator();

export default function AuthStack({ skipAuthHandler }) {
	return (
		<NavigationContainer>
			<Stack.Navigator>
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
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="SignUp" component={SignUp} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
