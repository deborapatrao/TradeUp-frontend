import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Input,
    Button
} from "native-base";
import axios from 'axios';
import PriceStatic from '../../components/containers/market/PriceStatic';
import BuyAndSellComponent from './buyAndSell/BuyAndSell';


const BuyAndSellScreen = ({ navigation, route }) => {
    const { ticker } = route.params;

    useEffect(() => {
        navigation.setOptions({ headerTitle: ticker })
    }, [])

    return (
        <Box bgColor={'primary.bg'} flex={1}>
            <PriceStatic ticker={ticker} />
            <BuyAndSellComponent navigation={navigation} ticker={ticker} />
        </Box>
    );
};

export default BuyAndSellScreen;
