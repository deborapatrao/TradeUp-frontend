import React, { useState, useEffect} from "react";
import {
    Box,
    Text
} from "native-base";

const axios = require("axios");

const CoinInfoScreen = () => {
const [coin, setCoin] = useState()
const coinSymbol = 'BTC';

    useEffect(() => {
        loadCoinInfo();
    }, [])
    async function loadCoinInfo() {
        try {
            const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${coinSymbol}`, {
                headers: {
                    'X-CMC_PRO_API_KEY': '593e142c-aed0-473d-8fa3-d0a941367982',
                    
                }
            })
            setCoin(response.data.data[coinSymbol][0])
            console.log(coin)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box bgColor={'primary.bg'} flex={1}>
            <Text>{coin?.name}({coin?.symbol})</Text>

            <Text>What is {coin?.name}({coin?.symbol})</Text>
            <Text>{coin?.description}</Text>
        </Box>
    );
};

export default CoinInfoScreen;