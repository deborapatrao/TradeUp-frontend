import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//screens
import OverviewScreen from '../../screens/wallet/OverviewScreen';
import AssetsScreen from '../../screens/wallet/AssetsScreen';
import TradesScreen from '../../screens/wallet/TradesScreen';
import OrdersScreen from '../../screens/wallet/OrdersScreen';



const Tab = createMaterialTopTabNavigator();


const WalletTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Overview" component={OverviewScreen} />
            <Tab.Screen name="Assets" component={AssetsScreen} />
            <Tab.Screen name="All Trades" component={TradesScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
        </Tab.Navigator>
    )
}

export default WalletTabNavigator 