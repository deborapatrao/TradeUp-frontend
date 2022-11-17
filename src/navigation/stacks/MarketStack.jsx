import { View, Text, } from 'react-native'
import { ChevronLeftIcon } from 'native-base'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import HomeHeader from '../../components/layout/HomeHeader';
import MarketHeader from '../../components/layout/MarketHeader';

// screens
import MarketScreen from '../../screens/market/MarketScreen';
import CryptoDetailTabNavigator from './CryptoDetailTabNavigator';
import BuyAndSellScreen from '../../screens/market/BuyAndSellScreen';
import PriceAlertScreen from '../../screens/market/PriceAlert';

const MarketStack = createStackNavigator();


const MarketStackScreen = () => {

    return (
        <MarketStack.Navigator>
            <MarketStack.Screen name="CryptoList" component={MarketScreen} options={({ navigation }) => ({
                headerTitle: (props) => <HomeHeader {...props} navigation={navigation} />,
                headerShown: true, // hide header
                headerStyle: {
                    backgroundColor: '#171122',
                }
            })} />
            <MarketStack.Screen name="CryptoDetail" component={CryptoDetailTabNavigator} options={({ navigation, route }) => ({
                headerTitle: (props) => <MarketHeader {...props} navigation={navigation} route={route} />,
                navigationBarColor: 'gray.400',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#171122',
                },
                headerTitleStyle: {
                    color: '#fff'
                },
                headerBackTitleVisible: false,
                headerBackTitleStyle: {
                    color: '#fff'
                }
                //    headerBackImageSource:'src image'
            })} />
            <MarketStack.Screen name="BuyAndSell" component={BuyAndSellScreen} options={({ navigation, route }) => ({
                headerTitle: (props) => <MarketHeader {...props} navigation={navigation} route={route} />,
                navigationBarColor: 'gray.400',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#171122',
                },
                headerTitleStyle: {
                    color: '#fff'
                },
                headerBackTitleVisible: false,
                headerBackTitleStyle: {
                    color: '#fff'
                }
            })} />
            <MarketStack.Screen name="PriceAlert" component={PriceAlertScreen} options={{
                headerTitle: 'Price Alert',
                headerTitleAlign: 'center'
            }} />

        </MarketStack.Navigator>
    )
}

export default MarketStackScreen