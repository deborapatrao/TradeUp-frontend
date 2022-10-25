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
            <CryptoList navigation={navigation} />
        </Box>
    );
};

export default MarketScreen;