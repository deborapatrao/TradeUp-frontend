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
    // console.log('ticker cryptodetail', ticker)
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarLabelStyle: { fontSize: 12, color: '#fff' },
            // tabBarItemStyle: { width: 100 },
            tabBarStyle: { borderBottomWidth: 0.3, borderBottomColor: '#2E2343' },
            tabBarLabel: ({ focused, color }) => {
                return <Text style={{
                    textDecorationLine: focused ? 'underline' : 'none',
                    color,
                    textDecorationStyle: 'solid',
                    fontSize: 16,
                    fontWeight: focused ? 'bold' : 'normal',
                    width: '110%',
                }}>{route.name}</Text>;
            },
            tabBarIndicatorContainerStyle: {
                borderBottomColor: '#2E2343',
                borderBottomWidth: 0.5,
                borderTopColor: '#2E2343',
                borderTopWidth: 1.3,
            },

        })}>
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