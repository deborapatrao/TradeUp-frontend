import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./screens/Onboarding";
import Header from "./components/layout/Header";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NativeBaseProvider>
            <StatusBar style="auto" />
                <Header />
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="onboarding">
                        <Stack.Screen name="onboarding" component={Onboarding} />
                    </Stack.Navigator>
                </NavigationContainer>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({});
