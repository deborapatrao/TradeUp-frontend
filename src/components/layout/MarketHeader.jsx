import {  Text, Icon, Center} from 'native-base'
import React from 'react'
import { Ionicons} from '@expo/vector-icons';
import { StyleSheet} from "react-native";

const MarketHeader = ({ navigation }) => {
    
    return (
        <Center  flexDirection={'row'} w='100%' justifyContent={'space-around'}>
            <Text fontSize={'md'} > ETHUSTD </Text>
            <Icon as={Ionicons} 
            name="alarm-outline" 
            color={'black'} 
            size={6} 
            mr={5} 
            onPress={() => navigation.navigate('PriceAlert')}/>
        </Center>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        alignItems: 'space-between',
        justifyContent:'space-between',
    },
    headerTitle: {
        color:'black',
        fontSize: 5,
        alignSelf:'center'
    }
});

export default MarketHeader