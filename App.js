import Main from "./Main";

import { Provider } from "react-redux";
import store from "./src/redux/store";
import { Text } from 'react-native';
import { useFonts } from 'expo-font';


export default function App() {
    const [fontsLoaded] = useFonts({
        'sfProFont': require('./assets/fonts/SF-Pro.ttf'),
    });

    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }

    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}