import React from 'react'
import {
    Box,
    Button,
    Text
} from "native-base";

const MarketScreen = ({ navigation }) => {

    return (
        <Box bgColor={'primary.bg'} flex={1}>
            {/* <Text fontFamily="body" fontWeight="100" fontStyle="normal" color={'primary.bg'}>MarketScreen</Text>
            <Text fontFamily="body" fontWeight="200" fontStyle="normal" color={'primary.bg'}>MarketScreen</Text> */}
            <Text>MarketScreen</Text>
            <Button alignSelf={'flex-start'} onPress={() => navigation.navigate('CryptoDetail')}>Crypto Detail Screen</Button>
        </Box>
    );
};

export default MarketScreen;
