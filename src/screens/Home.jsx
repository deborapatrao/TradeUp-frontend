import React, { useState, useEffect } from "react";
import { Platform, Linking } from "react-native";
import { Box, Text, Button, Heading } from "native-base";
import { loadUser } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { color } from "react-native-reanimated";
import Constants from "expo-constants";
import * as IntentLauncher from "expo-intent-launcher";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
	const dispatch = useDispatch();
	const { user, token, isAuthenticated } = useSelector((state) => state.auth);
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	console.log(token);
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

	// Ask for permission to access location on the device
	useEffect(() => {
		(async () => {
			if (location == null) {
				let { status } =
					await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					setErrorMsg("Permission to access location was denied");
					return;
				}

				let userLocation = await Location.getCurrentPositionAsync({});
				let address = await Location.reverseGeocodeAsync(
					userLocation.coords
				);
				setLocation(address[0].city);
			}
		})();
	}, []);

	// Testing
	useEffect(() => {
		(async () => {
			// const token = await AsyncStorage.getAllKeys();
			const token = await AsyncStorage.getItem('userIdToken');
			const userToken = await AsyncStorage.getItem('userId');
			// await AsyncStorage.clear();
			console.log('Token: ', token);
			console.log('userId: ', userToken);
		})();
	}, []);

	const requestPermissions = async () => {
		const permission = await Location.getForegroundPermissionsAsync();

		// Detect if you can request this permission again
		if (!permission.canAskAgain && permission.status == "denied") {
			/**
			 *   Code to open device setting then the user can manually grant the app
			 *   permission
			 */
			if (Platform.OS == "ios") {
				Linking.openURL("app-settings:");
			} else {
				const pkg = Constants.manifest.releaseChannel
					? Constants.manifest.android.package
					: "host.exp.exponent";

				IntentLauncher.startActivityAsync(
					IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
					{ data: "package:" + pkg }
				);
			}
		} else {
			// Ask for permission again
			try {
				let { status } =
					await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					setErrorMsg("Permission to access location was denied");
					return;
				}

				let userLocation = await Location.getCurrentPositionAsync({});
				let address = await Location.reverseGeocodeAsync(
					userLocation.coords
				);
				setLocation(address[0].city);
			} catch (err) {
				console.log(err);
			}
		}
	};



	return (
		<>
			<Heading>
				Top Traders
			</Heading>
			<Text>{user ? user.email : "Not logged in"}</Text>
			{!location ? (
				<Button onPress={requestPermissions}>Allow Location</Button>
			) : (
				<Text>Location Allowed</Text>
			)}
		</>
	);
};

export default Home;
