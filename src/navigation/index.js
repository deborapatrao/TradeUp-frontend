import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/utils/Loader";

export default function RootNavigation() {
	const dispatch = useDispatch();

	const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
	const [skipAuth, setSkipAuth] = useState(false);

	const skipAuthHandler = () => {
		setSkipAuth(true);
		// console.log("onboarding2", skipAuth);
	};

	// console.log("onboarding", skipAuth);
	// console.log("isAuthenticated", isAuthenticated);

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
