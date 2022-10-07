import { View, Box, Text, Icon, Button } from 'native-base'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'

const Test = ({ navigation }) => {
    return (
        <View>
            <Text>Test</Text>
            {/* <Icon size={5} ml={2} color={'#fff'} as={<Ionicons name="ios-search" />} /> */}
            <Text>
                <Icon size={5} ml={2} color={'#fff'} as={<Ionicons name="ios-search" />} />
            </Text>
            <Button onPress={() => navigation.navigate('InfoHome')}>InfoHome</Button>
        </View>
    )
}

export default Test