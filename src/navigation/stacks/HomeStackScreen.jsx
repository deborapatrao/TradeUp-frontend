import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from '../../screens/Test';

const HomeStack = createNativeStackNavigator();


const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="New" component={Test} />
            <HomeStack.Screen name="InfoHome" component={Test} />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen