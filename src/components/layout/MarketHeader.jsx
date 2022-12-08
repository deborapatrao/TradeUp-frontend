import { Text, Icon, Box, HStack, Image, Pressable } from 'native-base'
import React from 'react'
import Alert from '../../assets/images/icons/alert-icon.png'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";

const MarketHeader = ({ navigation, route }) => {
    const { ticker } = route.params;
    // console.log('ticker', ticker);
    return (
        <HStack w='100%' >
            <Text fontSize={'md'} ml={'40%'} color={'white'}>{ticker}</Text>
            <Pressable onPress={() => {
                // console.log('pressed');
                navigation.navigate('PriceAlert', { ticker: ticker })
            }}>
                <Image source={Alert}
                    alt={'alert icon'}
                    w={6}
                    h={5}
                    marginLeft={"50%"} />
            </Pressable>
        </HStack>
    )
};
export default MarketHeader