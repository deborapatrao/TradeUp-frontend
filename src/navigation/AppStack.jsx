import React, { useEffect, useState } from "react";
import { NativeBaseProvider, useColorMode, Icon, Image } from "native-base";
import { Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Test from "../screens/Test";
import ArticleList from "../components/lists/ArticleList";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MarketStack from "./stacks/MarketStack";
import MainStack from "./stacks/MainStack";
import HomeTour from "../screens/tour/HomeTour";
import HomeHeader from "../components/layout/HomeHeader";
import WalletTabNavigator from "./stacks/WalletTabNavigator";
import HomeIconInactive from "../assets/images/bottom-tabs-icons/inactive/home.png";
import MarketIconInactive from "../assets/images/bottom-tabs-icons/inactive/market.png";
import ResourceIconInactive from "../assets/images/bottom-tabs-icons/inactive/resource.png";
import WalletIconInactive from "../assets/images/bottom-tabs-icons/inactive/wallet.png";
import HomeIconActive from "../assets/images/bottom-tabs-icons/active/home.png";
import MarketIconActive from "../assets/images/bottom-tabs-icons/active/market.png";
import ResourceIconActive from "../assets/images/bottom-tabs-icons/active/resource.png";
import WalletIconActive from "../assets/images/bottom-tabs-icons/active/wallet.png";
// import { useFonts } from 'expo-font';
// import SfProFont from '../assets/fonts/SF-Pro.ttf';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/MenuRegistered";

import { navigatorTheme } from "../theme";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/action";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppStack = () => {

	const [canTour, setCanTour] = useState(true);

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

	const dispatch = useDispatch();
	const { user, token, isAuthenticated } = useSelector((state) => state.auth);

	(async () => {
		const tokenStorage = await AsyncStorage.getItem("userIdToken");
		const userId = await AsyncStorage.getItem("userId");

		// console.log("Storage: ", tokenStorage);
		// console.log("userId: ", userId);
	})();

	// console.log("Token: ", token);
	// console.log("isAuthenticated: ", isAuthenticated);

	// Check if user is authenticated and token is received from server then load user
	useEffect(() => {
		if (!user && token && isAuthenticated) {
			dispatch(loadUser(token));

			if (user) {
				user.location.city
					? setLocation(user.location.city)
					: setLocation(null);
			}
		}
	}, [dispatch, user]);

	// get user from redux store to check if user tour is complete
	// console.log(user)
	return (
		<>
		{user && user.isTutorial && canTour ? (
			<NavigationContainer theme={MyTheme}>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen
						name="Home"
						options={({ navigation, route }) => ({
							headerTitle: (props) => <HomeHeader {...props} navigation={navigation} />,
							headerBackgroundContainerStyle: {
								backgroundColor: "#171122",
							},
							headerStyle: {
								backgroundColor: "#171122",
							},
							headerShown: true, // hide header     
						})}
					>
						{(props) => (
							<HomeTour
								{...props}
								setCanTour={setCanTour}
							/>
						)}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		) : (
		<NavigationContainer theme={MyTheme}>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "Home") {
							iconName = focused
								? HomeIconActive
								: HomeIconInactive;
						} else if (route.name === "Market") {
							iconName = focused
								? MarketIconActive
								: MarketIconInactive;
						} else if (route.name === "Resources") {
							iconName = focused
								? ResourceIconActive
								: ResourceIconInactive;
						} else if (route.name === "Wallet") {
							iconName = focused
								? WalletIconActive
								: WalletIconInactive;
						}

						// You can return any component that you like here!
						// return <Ionicons name={iconName} size={size} color={color} />;
						return <Image source={iconName} alt="Alternate Text" />;
					},
					tabBarActiveTintColor: "#F2F2F2",
					tabBarInactiveTintColor: "#7F7F7F",
					headerShown: false, // hide header
					tabBarStyle: {
						backgroundColor: "#171122",
						borderTopColor: "#413556",
						height: 60,
						paddingBottom: 10,
						// paddingTop: 10,
						// height: 85
					},
					tabBarLabelStyle: {
						fontSize: 12,
					},
					tabBarHideOnKeyboard: true,

				})}
				// initialRouteName="Market"
			>
				<Tab.Screen
					name="Home"
					component={MainStack}
					// options={{
					// 	headerTitle: (props) => <HomeHeader {...props} />,
					// 	headerBackgroundContainerStyle: {
					// 		backgroundColor: "#171122",
					// 	},
					// 	headerStyle: {
					// 		backgroundColor: "#171122",
					// 	},
					// 	headerShown: true, // hide header
					// }}
					options={({ navigation, route }) => ({
						headerTitle: (props) => <HomeHeader {...props} navigation={navigation} />,
						headerBackgroundContainerStyle: {
							backgroundColor: "#171122",
						},
						headerStyle: {
							backgroundColor: "#171122",
						},
						headerShown: true, // hide header
					})}
				/>
				<Tab.Screen name="Market" component={MarketStack} 
					options={({ navigation }) => ({
						headerTitle: (props) => <HomeHeader {...props} navigation={navigation} />,
					})}
				/>
				<Tab.Screen
					name="Resources"
					component={ArticleList}
					options={({ navigation }) => ({
						headerShown: true,
						headerTitle: (props) => <HomeHeader {...props} navigation={navigation}/>,
						headerStyle: {
							backgroundColor: "#171122",
						},
						headerTitleStyle: {
							color: "#F2F2F2",
						},
					})}
				/>
				<Tab.Screen
					name="Wallet"
					component={WalletTabNavigator}
					options={({ navigation }) => ({
						headerShown: true,
						headerTitle: (props) => <HomeHeader {...props} navigation={navigation}/>,
						headerStyle: {
							backgroundColor: "#171122",
						},
						headerTitleStyle: {
							color: "#F2F2F2",
						},
					})}
				/>
			</Tab.Navigator>
		</NavigationContainer>
		)}
		</>
	);
};

export default AppStack;
