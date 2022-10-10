import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeHeader from '../../components/layout/HomeHeader';

// screens
import MarketScreen from '../../screens/market/MarketScreen';
import CryptoDetailTabNavigator from './CryptoDetailTabNavigator';
import BuyAndSellScreen from '../../screens/market/BuyAndSellScreen';

const HomeStack = createNativeStackNavigator();


const MarketStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Crypto List" component={MarketScreen} options={{
                headerTitle: (props) => <HomeHeader {...props} />,
                headerShown: true, // hide header
            }} />
            <HomeStack.Screen name="CryptoDetail" component={CryptoDetailTabNavigator} options={{
                headerTitle: 'Ticker and icon here'
            }} />
            <HomeStack.Screen name="BuyAndSell" component={BuyAndSellScreen} options={{
                headerTitle: 'Ticker and icon here'
            }} />
        </HomeStack.Navigator>
    )
}

export default MarketStackScreen