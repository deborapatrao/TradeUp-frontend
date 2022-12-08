// import Main from "./Main";
import "./src/config/firebase-config";
import RootNavigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import {
    SafeAreaProvider,
    initialWindowMetrics,
} from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { customTheme } from "./src/theme";
// import { TourGuideProvider } from "rn-tourguide";
import { LogBox } from 'react-native';

//Ignore all log notifications
LogBox.ignoreAllLogs();

export default function App() {
    const [fontsLoaded] = useFonts({
        sfProFont: require("./assets/fonts/SF-Pro.ttf"),
    });

    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }

    const style = {
        borderRadius: 10,
        paddingTop: 5,
    }

    return (
        <Provider store={store}>
            <NativeBaseProvider theme={customTheme}>
                <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                    {/* <TourGuideProvider preventOutsideInteraction {...{ borderRadius: 16, androidStatusBarVisible: true, tooltipStyle: style, backdropColor: 'rgba(23, 17, 34, 0.95)' }}> */}
                    <RootNavigation />
                    {/* </TourGuideProvider> */}
                </SafeAreaProvider>
            </NativeBaseProvider>
        </Provider>
    );
}
