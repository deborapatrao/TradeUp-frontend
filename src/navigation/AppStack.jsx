import React from 'react'
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Test from '../screens/Test';

import HomeStackScreen from '../navigation/stacks/HomeStackScreen';


const Tab = createBottomTabNavigator();

const AppStack = () => {
    return (
        <NativeBaseProvider>
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
                    <Tab.Screen name="Home" component={HomeStackScreen} />
                    <Tab.Screen name="Market" component={Test} />
                    <Tab.Screen name="Resources" component={Test} />
                    <Tab.Screen name="Wallet" component={Test} />
                </Tab.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}


export default AppStack