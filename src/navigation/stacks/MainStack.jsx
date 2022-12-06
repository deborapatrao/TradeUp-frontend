import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, createStackNavigator } from "@react-navigation/stack";

// screens
import Home from '../../screens/Home';
import HomeHeader from '../../components/layout/HomeHeader';
import Leaderboard from '../../screens/leaderboard/Leaderboard';
import SavedResources from '../../screens/resources/SavedResources';
import Profile from '../../screens/Profile';
import Notification from '../../screens/Notifications';
import Support from '../../screens/Support';
import UserAgreement from '../../screens/UserAgreement';
import Menu from '../../screens/Menu';

import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const MainStack = ({ goToMarket }) => {

    const { user } = useSelector((state) => state.auth);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" children={() => <Home goToMarket={goToMarket} />} options={{
                headerShown: false, // hide header
            }} />
            <Stack.Screen name="Menu" component={Menu} options={{
                headerTitle: '',
                headerBackTitleVisible: false
            }} />
            <Stack.Screen name="Leaderboard" component={Leaderboard} />
            <Stack.Screen name="Saved Resources" component={SavedResources} />
            <Stack.Screen name="Profile Settings" component={Profile} />
            <Stack.Screen name="Notifications" component={Notification} options={headerTitle = "Notification Settings"} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="User Agreement" component={UserAgreement} />
        </Stack.Navigator>
    )
}

export default MainStack