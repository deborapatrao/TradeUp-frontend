import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//screens
import ArticleList from '../../components/lists/ArticleList';
import ArticleSingle from '../../screens/resources/ArticleSingle';
import { createStackNavigator } from '@react-navigation/stack';
import HomeHeader from '../../components/layout/HomeHeader';
import SampleResource from '../../screens/resources/SampleResource';

const ResourcesStack = createStackNavigator();

const ResourcesStackScreen = () => {

    return (
        <ResourcesStack.Navigator>
            <ResourcesStack.Screen name='ArticleList' component={ArticleList} options={{
                headerShown: false
            }} />

            <ResourcesStack.Screen name='SampleResource' component={SampleResource} options={({ navigation, route }) => ({
                headerTitle: 'Candlestick Chart Basics',
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

            < ResourcesStack.Screen name='ArticleSingle' component={ArticleSingle} options={({ navigation, route }) => ({
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
            })
            } />

        </ResourcesStack.Navigator>
    )
}

export default ResourcesStackScreen