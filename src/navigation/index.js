import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { NativeBaseProvider, useColorMode, StatusBar, Box } from "native-base";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/utils/Loader";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootNavigation() {
	const dispatch = useDispatch();

	const { user, token, isAuthenticated, loading, error } = useSelector(
		(state) => state.auth
	);
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

	const { colorMode } = useColorMode();

	return (
		<>
			<StatusBar
				barStyle={
					colorMode === "dark" ? "light-content" : "dark-content"
				}
				translucent
				backgroundColor="transparent"
			/>

			{isAuthenticated || skipAuth ? (
				<AppStack />
			) : (
				<AuthStack skipAuthHandler={skipAuthHandler} />
			)}
		</>
	);
}
