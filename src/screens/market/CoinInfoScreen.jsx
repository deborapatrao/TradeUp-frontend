import React, { useState, useEffect} from "react";
import {
    Box,
    Text
} from "native-base";

const axios = require("axios");

const CoinInfoScreen = () => {

    useEffect(() => {
        loadCoinInfo();
    }, [])
    async function loadCoinInfo() {
        try {
            const response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                headers: {
                  'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
                },
              });

            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box bgColor={'primary.bg'} flex={1}>
            <Text>CoinInfoScreen</Text>
        </Box>
    );
};

export default CoinInfoScreen;
