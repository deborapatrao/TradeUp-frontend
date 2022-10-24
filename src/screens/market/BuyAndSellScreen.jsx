import React from 'react'
import {
    Box,
    Text
} from "native-base";
import BuyScreen from './buyAndSell/BuyAndSell';
import PriceStatic from '../../components/containers/market/PriceStatic';


const BuyAndSellScreen = () => {

    return (
        <Box bgColor={'primary.bg'} flex={1}>

            <PriceStatic/>
            <BuyScreen/>
        </Box>
    );
};

export default BuyAndSellScreen;
