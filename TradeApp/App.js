import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding from "./screens/Onboarding";
import SignUp from "./screens/SignUp";
import Login from './screens/Login';

import Header from "./components/layout/Header";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NativeBaseProvider>
            <StatusBar style="auto" />
                <Header />
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="onboarding">
                        <Stack.Screen name="onboarding" component={Onboarding} options={{ headerShown: false }} />
                        <Stack.Screen name="signup" component={SignUp} />
                        <Stack.Screen name="login" component={Login} />
                    </Stack.Navigator>
                </NavigationContainer>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({});
