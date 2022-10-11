import { useAuthentication } from "../hook/useAuthentication";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export default function RootNavigation() {
	
	const [onboarding, setOnboarding] = useState(true);

	const onboardingHandler = () => {
		setOnboarding(false);
	};

	return (
		<NativeBaseProvider>
			<StatusBar style="auto" />
			{onboarding ? <AuthStack onboardingHandler={onboardingHandler} /> : <AppStack />}
		</NativeBaseProvider>
	);
}
