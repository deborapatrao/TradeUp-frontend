import React, { useEffect, useState } from 'react'
import {
    Box,
    HStack,
    Text,
    Heading,
    VStack,
    Button,
} from "native-base";
import { getWalletData } from '../../utils/requests';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import { priceFormatter } from '../../components/utils/numberFormats';


const OverviewScreen = ({ navigation }) => {
    const [walletData, setWalletData] = useState('');

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        // console.log('check');
        // if (user) {
        // } else {
        //     console.log('not authenticated');
        // }
        const unsubscribe = navigation.addListener('focus', async () => {
            const data = await getWalletData('/wallet');
            console.log(data);
            setWalletData(data);
        });


        return unsubscribe;

    }, [navigation]);

    return (
        <Box bgColor={'primary.bg'} flex={1} px={4} pt={6}>
            <VStack>
                <HStack style={styles.heading} justifyContent={'space-between'}>
                    <Heading style={styles.headingText} color={'supporting.lightGreen'}>Performance</Heading>
                    <Heading style={styles.headingText} color={'supporting.lightGreen'}>{((parseFloat(walletData?.totalBalance) - 1000) / 1000 * 100).toFixed(4)}%</Heading>
                </HStack>

                <HStack style={styles.row} justifyContent={'space-between'} >
                    <Text style={styles.rowText} color={'secondary.white'}>Total Gain (Loss)</Text>
                    <Text style={styles.rowText} color={'secondary.white'}>$500</Text>
                </HStack>

                <HStack style={styles.row} justifyContent={'space-between'} >
                    <Text style={styles.rowText} color={'secondary.white'}>Total Trades</Text>
                    <Text style={styles.rowText} color={'secondary.white'}>6</Text>
                </HStack>

                <HStack style={styles.row} justifyContent={'space-between'} >
                    <Text style={styles.rowText} color={'secondary.white'}>Average Performance</Text>
                    <Text style={styles.rowText} color={'secondary.white'}>50%</Text>
                </HStack>

                <HStack style={styles.heading} justifyContent={'space-between'} >
                    <Heading style={styles.headingText} color={'supporting.lightGreen'}>Total Asset Value</Heading>
                    <Heading style={styles.headingText} color={'supporting.lightGreen'}>${priceFormatter(walletData?.totalBalance)}</Heading>
                </HStack>

                <HStack style={styles.row} justifyContent={'space-between'} >
                    <Text style={styles.rowText} color={'secondary.white'}>USDT Coin</Text>
                    <Text style={styles.rowText} color={'secondary.white'}>${priceFormatter(walletData?.usdtBalance)}</Text>
                </HStack>


                <HStack style={styles.row} justifyContent={'space-between'} >
                    <Text style={styles.rowText} color={'secondary.white'}>Other Assets</Text>
                    <Text style={styles.rowText} color={'secondary.white'}>${priceFormatter(walletData?.assetsBalance)}</Text>
                </HStack>

                <VStack space={4} mt={5}>
                    <Button bg={'secondary.blue'}>Trade</Button>
                    <Button bg={'secondary.darkGray'} isDisabled>Reset</Button>
                </VStack>
            </VStack>

            {/* <VStack>
                <HStack>
                    <Heading><Text>Performance</Text></Heading>;
                    <Heading><Text>50%</Text></Heading>;
                </HStack>
            </VStack> */}
        </Box>
    );
};

const styles = StyleSheet.create({
    row: {
        marginVertical: 7,
    },
    rowText: {
        fontSize: 16
    },
    heading: {
        marginVertical: 17,

    },
    headingText: {
        fontSize: 20
    }
})


export default OverviewScreen;
