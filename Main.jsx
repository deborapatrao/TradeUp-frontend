// import React, { useEffect } from 'react'
// import { StatusBar } from "expo-status-bar";
// import { NativeBaseProvider, Center, Text, Icon } from "native-base";
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { useSelector, useDispatch } from "react-redux";
// import { loadUser } from "./src/redux/action";

import Header from "./src/components/layout/Header";
import Onboarding from "./src/screens/Onboarding";
import SignUp from "./src/screens/SignUp";
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Loader from './src/components/utils/Loader';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Test from './src/screens/Test';

import AppStack from './src/navigation/AppStack';

// const Stack = createNativeStackNavigator();

// const Tab = createBottomTabNavigator();

// const Main = ({ route }) => {

  const dispatch = useDispatch()

  // useEffect(() => {
  //     dispatch(loadUser())
  // }, [dispatch])

  const { isAuthenticated, loading } = useSelector(state => state.auth)

  return <>
    {/* Uncomment me if you want to see Bottom Tabs */}
    <AppStack />


    {/* Comment me out if you want to see Bottom Tabs */}
    {/* <NativeBaseProvider>
      <StatusBar style="auto" />
      <Header />
      {loading ? <Center flex={1} px="3"><Loader /></Center> : <NavigationContainer>
        <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Onboarding"}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>

        {isAuthenticated}
      </NavigationContainer>}
    </NativeBaseProvider> */}
  </>
}

//   return <>
//     {/* Uncomment me if you want to see Bottom Tabs */}
//     {/* <AppStack /> */}


//     {/* Comment me out if you want to see Bottom Tabs */}
//     <NativeBaseProvider>
//       <StatusBar style="auto" />
//       <Header />
//       {loading ? <Center flex={1} px="3"><Loader /></Center> : <NavigationContainer>
//         <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Onboarding"}>
//           <Stack.Screen name="Onboarding" component={Onboarding} />
//           <Stack.Screen name="Signup" component={SignUp} />
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="Home" component={Home} />
//         </Stack.Navigator>

//         {isAuthenticated}
//       </NavigationContainer>}
//     </NativeBaseProvider>
//   </>
// }

// export default Main
