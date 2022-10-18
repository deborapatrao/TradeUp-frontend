import React from 'react'
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Test from '../screens/Test';

import MarketStack from './stacks/MarketStack';
import MainStack from './stacks/MainStack';
import Home from '../screens/Home';
import HomeHeader from '../components/layout/HomeHeader';
import WalletTabNavigator from './stacks/WalletTabNavigator';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppStack = () => {
    const theme = extendTheme({
        colors: {
            primary: {
                bg: "#221A32",
                field: "#231D30",
                blue: "#386AF5",
                red: "#FF6666",
            },
            secondary: {
                lightGray: "#CCCCCC",
                darkGray: "#7F7F7F",
                white: "#F2F2F2",
            },
            supporting: {
                lightGreen: "#31C451",
                darkGreen: "#29A343"
            }
        },
        config: {
            initialColorMode: 'dark',
        }
    });





    return (
        <NativeBaseProvider theme={theme}>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'ios-home'
                                : 'ios-home-outline';
                        } else if (route.name === 'Market') {
                            iconName = focused ? 'logo-bitcoin' : 'logo-bitcoin';
                        } else if (route.name === 'Resources') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        } else if (route.name === 'Wallet') {
                            iconName = focused
                                ? 'ios-cash'
                                : 'ios-cash-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false, // hide header
                })}>
                    <Tab.Screen name="Home" component={MainStack} />
                    <Tab.Screen name="Market" component={MarketStack} />
                    <Tab.Screen name="Resources" component={Test} />
                    <Tab.Screen name="Wallet" component={WalletTabNavigator} options={{
                        headerShown: true
                    }} />
                </Tab.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}


export default AppStack