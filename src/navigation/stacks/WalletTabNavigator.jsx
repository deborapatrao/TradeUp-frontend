import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//screens
import OverviewScreen from '../../screens/wallet/OverviewScreen';
import AssetsScreen from '../../screens/wallet/AssetsScreen';
import TradesScreen from '../../screens/wallet/TradesScreen';
import OrdersScreen from '../../screens/wallet/OrdersScreen';



const Tab = createMaterialTopTabNavigator();


const WalletTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarScrollEnabled: true,
            headerShown: false,
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#fff',
            tabBarIndicatorStyle: {
                backgroundColor: '#fff',
            },
            tabBarStyle: {
                backgroundColor: '#171122',
            },
            tabBarIndicator: () => null,
            // tabBarLabelStyle: {
            //     fontSize: 16,
            //     textTransform: 'none',
            // },
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
            tabBarContentContainerStyle: {
                paddingHorizontal: 4,
            },
        })}>
            <Tab.Screen name="Overview" component={OverviewScreen} />
            <Tab.Screen name="Assets" component={AssetsScreen} />
            <Tab.Screen name="Trade History" component={TradesScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
            <Tab.Screen name="Price Alert" component={OrdersScreen} />
        </Tab.Navigator>
    )
}

export default WalletTabNavigator 