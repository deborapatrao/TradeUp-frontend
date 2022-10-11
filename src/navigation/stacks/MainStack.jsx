import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from '../../screens/Profile';
import Home from '../../screens/Home';
import HomeHeader from '../../components/layout/HomeHeader';
import Onboarding from '../../screens/Onboarding';
import Login from '../../screens/Login';
import SignUp from '../../screens/SignUp';
// screens

const Stack = createNativeStackNavigator();


const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={Home} options={{
                headerTitle: (props) => <HomeHeader {...props} />,
                headerShown: true, // hide header
            }} />
            <Stack.Screen name="Profile" component={Profile} options={{
                headerTitle: 'User Profile'
            }} />
        </Stack.Navigator>
    )
}

export default MainStack