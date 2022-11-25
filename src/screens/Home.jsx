import React, { useState, useEffect, useRef } from "react";
import "../config/firebase-config";
import { loadUser } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWalletData, postData } from "../utils/requests";
import TrendingCoinsList from "../components/lists/TrendingCoinsList";
import Leaderboard from "./leaderboard/Leaderboard";
import { Text, Button, View } from "native-base";
import { SvgUri } from 'react-native-svg';
import HomeIconInactive from "../assets/images/bottom-tabs-icons/inactive/home2.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';



Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: false,
		shouldPlaySound: false,
		shouldSetBadge: false,
		icon: 'https://i.stack.imgur.com/YlzsO.png',
	}),
});


const Home = ({ navigation }) => {
	const dispatch = useDispatch();
	const { user, token, isAuthenticated } = useSelector((state) => state.auth);

	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

		console.log('User: ', user);
	// Testing
	// useEffect(() => {

	// 	(async () => {
	// 		// const token = await AsyncStorage.getAllKeys();
	// 		// const token = await AsyncStorage.getItem("userIdToken");
	// 		// const userToken = await AsyncStorage.getItem("userId");
	// 		await AsyncStorage.clear();
	// 		// console.log("Token: ", token);
	// 		// console.log("userId: ", userToken);
	// 		// const response = await getWalletData("/wallet/history");
	// 	})();
	// }, []);

	useEffect(() => {
		registerForPushNotificationsAsync().then(async token => {
			console.log('Token: ', token);
			if (token) {
				try {
					await AsyncStorage.setItem("expoPushToken", token);
					setExpoPushToken(token)
					if(!user.fcm_token) {
						await postData("/user/token", { token });
						
					}
				} catch (error) {
					console.log(error);
				}

			}
		}).catch(e => console.log('Error: ', e));

		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});

		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	const goToMarket = () => {
		navigation.navigate("Market");
	}

	return (
		<>
			<View mt={5}>
				<TrendingCoinsList navigation={navigation} />
			</View>
			{/* <Button onPress={goToMarket}><Text>Test</Text></Button> */}
		</>
	);
};


async function registerForPushNotificationsAsync() {
	let token;
	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);

	} else {
		// alert('Must use physical device for Push Notifications');
		console.log('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
}

export default Home;
