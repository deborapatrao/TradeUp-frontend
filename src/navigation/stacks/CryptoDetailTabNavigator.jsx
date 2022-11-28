import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//screens
import ChartScreen from '../../screens/market/ChartScreen';
import CoinInfoScreen from '../../screens/market/CoinInfoScreen';
import OrdersScreen from '../../screens/market/OrdersScreen';


const Tab = createMaterialTopTabNavigator();


const CryptoDetailTabNavigator = ({ route }) => {
    const { ticker } = route.params;
    console.log('ticker cryptodetail', ticker)
    return (
        <Tab.Navigator screenOptions={{
            tabBarLabelStyle: { fontSize: 12, color: '#fff' },
            // tabBarItemStyle: { width: 100 },
            tabBarStyle: { backgroundColor: '#171122' },
        }}>
            <Tab.Screen name="Chart" component={ChartScreen} initialParams={{
                ticker: ticker
            }} />
            <Tab.Screen name="Orders" component={OrdersScreen} initialParams={{
                ticker: ticker
            }} />
            <Tab.Screen name="Coin Info" component={CoinInfoScreen} initialParams={{
                ticker: ticker
            }} />
        </Tab.Navigator>
    )
}

export default CryptoDetailTabNavigator 