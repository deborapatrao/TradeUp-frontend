import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, createStackNavigator } from "@react-navigation/stack";

// screens
import MenuRegistered from '../../screens/MenuRegistered';
import MenuUnregistered from '../../screens/MenuUnregistered';
import Home from '../../screens/Home';
import HomeHeader from '../../components/layout/HomeHeader';
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const MainStack = () => {

    const { user } = useSelector((state) => state.auth);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={Home} options={{
                headerShown: false, // hide header
            }} />
            <Stack.Screen name="Menu" component={user ? MenuRegistered : MenuUnregistered} options={{
                headerTitle: ''
            }} />
        </Stack.Navigator>
    )
}

export default MainStack