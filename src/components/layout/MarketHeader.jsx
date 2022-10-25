import {  Text, Icon, Box, HStack, Image} from 'native-base'
import React from 'react'
import Alert from '../../assets/images/icons/alert-icon.png'
import { Ionicons} from '@expo/vector-icons';
import { StyleSheet} from "react-native";

const MarketHeader = ({ navigation, route }) => {
    const {ticker} = route.params;

    return (
        <HStack w='100%'>
            <Text fontSize={'md'} ml={'40%'} color={'white'}>BTCUSDT </Text>
            <Image source={Alert} 
                alt={'alert icon'}
                w={6}
                h={5}
                marginLeft={"34%"}
                onPress={() => navigation.navigate('PriceAlert')}/>
        </HStack>
    )
};
export default MarketHeader