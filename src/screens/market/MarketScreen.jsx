import React from 'react'
import {
    Box,
    Button,
    Text
} from "native-base";

const MarketScreen = ({ navigation }) => {

    return (
        <Box safeArea>
            <Text>MarketScreen</Text>
            <Button alignSelf={'flex-start'} onPress={() => navigation.navigate('CryptoDetail')}>Crypto Detail Screen</Button>
        </Box>
    );
};

export default MarketScreen;
