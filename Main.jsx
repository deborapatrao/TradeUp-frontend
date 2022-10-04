import React, { useEffect } from 'react'
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Center } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./redux/action";

import Header from "./components/layout/Header";
import Onboarding from "./screens/Onboarding";
import SignUp from "./screens/SignUp";
import Login from './screens/Login';
import Home from './screens/Home';
import Loader from './components/Loader';

const Stack = createNativeStackNavigator();

const Main = ({route}) => {

  const dispatch = useDispatch()

  // useEffect(() => {
  //     dispatch(loadUser())
  // }, [dispatch])

  const {isAuthenticated, loading} = useSelector(state=>state.auth)

  return <>
    <NativeBaseProvider>
        <StatusBar style="auto" />
            <Header />
            { loading ? <Center flex={1} px="3"><Loader /></Center> : <NavigationContainer>
                <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Onboarding"}>
                    <Stack.Screen name="Onboarding" component={Onboarding} />
                    <Stack.Screen name="Signup" component={SignUp} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>

                {isAuthenticated}
            </NavigationContainer> }
    </NativeBaseProvider>
  </>
}

export default Main
