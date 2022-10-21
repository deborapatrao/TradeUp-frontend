import React from 'react'
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme, Icon, Image } from "native-base";
import { Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Test from '../screens/Test';

import MarketStack from './stacks/MarketStack';
import MainStack from './stacks/MainStack';
import Home from '../screens/Home';
import HomeHeader from '../components/layout/HomeHeader';
import WalletTabNavigator from './stacks/WalletTabNavigator';
import HomeIconInactive from '../assets/images/bottom-tabs-icons/inactive/home.png';
import MarketIconInactive from '../assets/images/bottom-tabs-icons/inactive/market.png';
import ResourceIconInactive from '../assets/images/bottom-tabs-icons/inactive/resource.png';
import WalletIconInactive from '../assets/images/bottom-tabs-icons/inactive/wallet.png';
import HomeIconActive from '../assets/images/bottom-tabs-icons/active/home.png';
import MarketIconActive from '../assets/images/bottom-tabs-icons/active/market.png';
import ResourceIconActive from '../assets/images/bottom-tabs-icons/active/resource.png';
import WalletIconActive from '../assets/images/bottom-tabs-icons/active/wallet.png';
// import { useFonts } from 'expo-font';
// import SfProFont from '../assets/fonts/SF-Pro.ttf';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppStack = () => {

    const theme = extendTheme({
        colors: {
            primary: {
                bg: "#171122",
                field: "#231D30",
            },
            secondary: {
                lightGray: "#CCCCCC",
                darkGray: "#7F7F7F",
                white: "#F2F2F2",
                blue: "#386AF5",
                red: "#FF6666",
            },
            supporting: {
                lightGreen: "#31C451",
                darkGreen: "#29A343"
            },
        },
        config: {
            initialColorMode: 'dark',
        },
        // fontConfig: {
        //     sfPro: {
        //         100: {
        //             normal: 'sfProFont',
        //         },
        //         200: {
        //             normal: 'sfProFont',
        //         },
        //         300: {
        //             normal: 'sfProFont',
        //         },
        //         400: {
        //             normal: 'sfProFont',
        //         },
        //         500: {
        //             normal: 'sfProFont',
        //         },
        //         600: {
        //             normal: 'sfProFont',
        //         },
        //         700: {
        //             normal: 'sfProFont',
        //         },
        //         800: {
        //             normal: 'sfProFont',
        //         },

        //     }
        // },
        // fonts: {
        //     heading: "sfPro",
        //     body: "sfPro",
        //     mono: "sfPro",
        // },
    });


    return (
        <NativeBaseProvider theme={theme}>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? HomeIconActive : HomeIconInactive
                        } else if (route.name === 'Market') {
                            iconName = focused ? MarketIconActive : MarketIconInactive
                        } else if (route.name === 'Resources') {
                            iconName = focused ? ResourceIconActive : ResourceIconInactive
                        } else if (route.name === 'Wallet') {
                            iconName = focused ? WalletIconActive : WalletIconInactive
                        }

                        // You can return any component that you like here!
                        // return <Ionicons name={iconName} size={size} color={color} />;
                        return <Image source={iconName} alt="Alternate Text" />;
                    },
                    tabBarActiveTintColor: '#F2F2F2',
                    tabBarInactiveTintColor: '#7F7F7F',
                    headerShown: false, // hide header
                    tabBarStyle: {
                        backgroundColor: '#171122',
                        paddingVertical: 10,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },
                })}>
                    <Tab.Screen name="Home" component={MainStack} options={{
                        headerTitle: (props) => <HomeHeader {...props} />,
                        headerBackgroundContainerStyle: {
                            backgroundColor: '#171122',
                        },
                        headerStyle: {
                            backgroundColor: '#171122',
                        },
                        headerShown: true, // hide header
                    }} />
                    <Tab.Screen name="Market" component={MarketStack} />
                    <Tab.Screen name="Resources" component={Test} />
                    <Tab.Screen name="Wallet" component={WalletTabNavigator} options={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#171122',
                        },
                        headerTitleStyle: {
                            color: '#F2F2F2',
                        },
                    }} />
                </Tab.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}


export default AppStack