import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//screens
import ChartScreen from '../../screens/market/ChartScreen';
import CoinInfoScreen from '../../screens/market/CoinInfoScreen';
import OrdersScreen from '../../screens/market/OrdersScreen';


const Tab = createMaterialTopTabNavigator();


const CryptoDetailTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarLabelStyle: { fontSize: 12, color: '#fff' },
            // tabBarItemStyle: { width: 100 },
            tabBarStyle: { backgroundColor: '#221A32' },
        }}>
            <Tab.Screen name="Chart" component={ChartScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
            <Tab.Screen name="Coin Info" component={CoinInfoScreen} />
        </Tab.Navigator>
    )
}

export default CryptoDetailTabNavigator 