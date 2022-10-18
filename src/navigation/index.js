import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "../components/utils/Loader";
import { loadUser } from "../redux/action";

export default function RootNavigation() {
	const dispatch = useDispatch();

	const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);
	const [skipAuth, setSkipAuth] = useState(false);

	const skipAuthHandler = () => {
		setSkipAuth(true);
	};

	const checkAuth = async () => {
		try {
			const value = await AsyncStorage.getItem("userIdToken");
			if (value !== null) {
				// value previously stored
				console.log("value", value);
				dispatch({ type: "keepAuth", payload: value });
			}
		} catch (e) {
			// error reading value
			console.log("error", e);
		}
	};

	useEffect(() => {
		checkAuth();
	}, [dispatch]);

	return (
		<NativeBaseProvider>
			<StatusBar style="auto" />
			{
			isAuthenticated || skipAuth ? (
				<AppStack />
			) : (
				<AuthStack skipAuthHandler={skipAuthHandler} />
			)}
		</NativeBaseProvider>
	);
}
