import React from 'react'
import {
    Box,
    Button,
    Text
} from "native-base";
import CryptoList from '../../components/lists/CryptoList';

const MarketScreen = ({ navigation }) => {

    return (
        <Box>
            <CryptoList />
            <Button alignSelf={'flex-start'} onPress={() => navigation.navigate('CryptoDetail')}>Crypto Detail Screen</Button>
        </Box>
    );
};

export default MarketScreen;