import React, { useState, useEffect } from "react";
import {
    Box,
    HStack,
    VStack,
    Heading,
    Text
} from "native-base";
import { StyleSheet } from "react-native";

const axios = require("axios");

const CoinInfoScreen = ({navigation, route}) => {

    const ticker = route.params;

    const [coin, setCoin] = useState()
    const coinSymbol = ticker.ticker.slice(0, -4);

    const coinInfo = {
        BTC: {
            ranking: 1,
            marketCap: 394848969124,
            maxSupply: 21000000,
            circulatingSupply: 19197806,
            high: 20664.82307301,
        },

        ETH: {
            ranking: 2,
            marketCap: 193237395002,
            maxSupply: "NO DATA",
            circulatingSupply: 122373863,
            high: 1586.37227307,
        },

        BNB: {
            ranking: 4,
            marketCap: 56388088419,
            maxSupply: 163276975,
            circulatingSupply: 159977314.28,
            high: 346.66387548,
        },

        XRP: {
            ranking: 6,
            marketCap: 23250380637,
            maxSupply: 100000000000,
            circulatingSupply: 50090000000,
            high: 0.46543415,
        },

        ADA: {
            ranking: 9,
            marketCap: 13828515529,
            maxSupply: 45000000000,
            circulatingSupply: 34330000000,
            high: 0.41197323,
        },

        SOL: {
            ranking: 10,
            marketCap: 11627748334,
            maxSupply: "NO DATA",
            circulatingSupply: 359080876.08,
            high: 32.57455317,
        },

        DOGE: {
            ranking: 8,
            marketCap: 16810203313,
            maxSupply: "NO DATA",
            circulatingSupply: 132670000000,
            high: 0.12420019,
        },

        TRX: {
            ranking: 15,
            marketCap: 5762033361,
            maxSupply: "NO DATA",
            circulatingSupply: 92250000000,
            high: 0.062418747,
        }
    }

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


        } catch (error) {
            console.log(error)
        }
    }

    //Abbreviation of numbers for Millions and Billions
// function numberAbbreviation(number){
//     const unit = ['', '', ' M', ' B', ''];
//     const numIndex = Math.floor((''+number).length/3);
//     console.log(numIndex)
//     let abbreviatedValue = 0;

//     if(numIndex>0 && numIndex<4) {
//         abbreviatedValue = parseFloat(number/Math.pow(1000, numIndex))
//         if (abbreviatedValue % 1 != 0) {
//             abbreviatedValue = abbreviatedValue.toFixed(1);
//         }
//     }else {
//         abbreviatedValue = number;
//     }

//     return abbreviatedValue + unit[numIndex];

// }

    return (
        <Box bgColor={'primary.bg'} flex={1} px={4} pt={6}>
            
            <VStack>
            <Heading style={styles.headingText} color={'supporting.lightGreen'}>{coin?.name}({coin?.symbol})</Heading>

                <HStack style={styles.row}>
                    <Text style={styles.bold}>Ranking</Text>
                    <Text>#{coinInfo[coinSymbol].ranking}</Text>
                </HStack>

                <HStack style={styles.row}>
                    <Text style={styles.bold}>Market Cap</Text>
                    <Text>{coinInfo[coinSymbol].marketCap}</Text>
                </HStack>

                <HStack style={styles.row}>
                    <Text style={styles.bold}>Max Supply</Text>
                    <Text>{coinInfo[coinSymbol].maxSupply}</Text>
                </HStack>

                <HStack style={styles.row}>
                    <Text style={styles.bold}>Circulating Supply</Text>
                    <Text>{coinInfo[coinSymbol].circulatingSupply}</Text>
                </HStack>

                <HStack style={styles.row}>
                    <Text style={styles.bold}>All-Time High</Text>
                    <Text>{coinInfo[coinSymbol].high}</Text>
                </HStack>
            </VStack>
                
            <VStack marginVertical={30}>
                <Heading style={styles.headingText} color={'supporting.lightGreen'}>What is {coin?.name}({coin?.symbol})</Heading>
                <Text style={styles.rowText} color={'secondary.white'}>{coin?.description}</Text>
            </VStack>

        </Box>
    );
};


const styles = StyleSheet.create({

    heading: {
        marginVertical: 17,

    },

    headingText: {
        fontSize: 20,
        marginBottom: 10,
    },

    row: {
        justifyContent: 'space-between',
    }, 

    bold: {
        fontWeight: 'bold',
        marginVertical: 5,
    }
})

export default CoinInfoScreen;