import { useAuthentication } from "../hook/useAuthentication";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";

export default function RootNavigation() {
	const { email } = useAuthentication();
	return (
		<NativeBaseProvider>
			<StatusBar style="auto" />
			{/* {email ? <AppStack /> : <AuthStack />} */}
            <AppStack />
            {/* <AuthStack /> */}
		</NativeBaseProvider>
	);
}
