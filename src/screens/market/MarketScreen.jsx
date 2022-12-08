import React from 'react'
import {
    Box,
    Button,
    Text
} from "native-base";
import CryptoList from '../../components/lists/CryptoList';

const MarketScreen = ({ navigation, route }) => {

    return (
        <Box>
            <CryptoList navigation={navigation} route={route} />
        </Box>
    );
};

export default MarketScreen;