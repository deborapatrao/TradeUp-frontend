// import Main from "./Main";
import "./src/config/firebase-config"
import RootNavigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { customTheme } from "./src/theme";

export default function App() {
    const [fontsLoaded] = useFonts({
        'sfProFont': require('./assets/fonts/SF-Pro.ttf'),
    });

    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }

    return (
        <Provider store={store}>
            <NativeBaseProvider theme={customTheme}>
                <SafeAreaProvider>
                    <RootNavigation />
                </SafeAreaProvider>
            </NativeBaseProvider>
        </Provider>
    );
}