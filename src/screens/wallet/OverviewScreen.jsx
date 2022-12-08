import React, { useEffect, useState } from 'react'
import {
    Box,
    HStack,
    Text,
    Heading,
    VStack,
    Button,
    Spinner,
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
        <Box bgColor={'primary.bg'} flex={1} style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <VStack>
                <HStack style={styles.heading} justifyContent={'space-between'}>
                    <Heading style={styles.headingText} color={'supporting.lightGreen'}>Performance</Heading>
                    {walletData?.totalBalance ?
                        <Heading style={styles.headingText} color={'supporting.lightGreen'}>{priceFormatter((parseFloat(walletData?.totalBalance) - 1000) / 1000 * 100)}%</Heading>
                        : walletData?.totalBalance == 0 ? <Text>0</Text> : <Spinner color={'supporting.lightGreen'} />}
                </HStack>

                <HStack style={styles.row} justifyContent={'space-between'} >
                    <Text style={styles.rowText} color={'secondary.white'}>Total Gain (Loss)</Text>
                    {walletData?.totalBalance ?
                        <Text style={styles.rowText} color={'secondary.white'}>{(parseFloat(walletData?.totalBalance) - 1000) > 0 || (parseFloat(walletData?.totalBalance) - 1000) == 0 ? "$" : "-$"}{priceFormatter((parseFloat(walletData?.totalBalance) - 1000) > 0 ? (parseFloat(walletData?.totalBalance) - 1000) : (-1) * (parseFloat(walletData?.totalBalance) - 1000))}</Text>
                        : walletData?.totalBalance == 0 ? <Text>0</Text> : <Spinner color={'supporting.white'} />}
                </HStack>

                <HStack style={styles.row} justifyContent={'space-between'}>
                    <Text style={styles.rowText} color={'secondary.white'}>Total Trades</Text>
                    {walletData?.totalQuantity ?
                        <Text style={styles.rowText} color={'secondary.white'}>{walletData?.totalQuantity}</Text>
                        : walletData?.totalQuantity == 0 ? <Text>0</Text> : <Spinner color={'supporting.white'} />}
                </HStack>

                <HStack style={styles.row} justifyContent={'space-between'} >
                    <Text style={styles.rowText} color={'secondary.white'}>Average Performance</Text>
                    {walletData?.totalBalance ?
                        <Text style={styles.rowText} color={'secondary.white'}>{priceFormatter(priceFormatter((parseFloat(walletData?.totalBalance) - 1000) / 1000 * 100) / walletData?.totalQuantity)}%</Text>
                        : walletData?.totalBalance == 0 ? <Text>0</Text> : <Spinner color={'supporting.white'} />}
                </HStack>

                <HStack style={styles.heading} justifyContent={'space-between'} >
                    <Heading style={styles.headingText} color={'supporting.lightGreen'}>Total Asset Value</Heading>
                    {walletData?.totalBalance ?
                        <Heading style={styles.headingText} color={'supporting.lightGreen'}>${priceFormatter(walletData?.totalBalance)}</Heading>
                        : walletData?.totalBalance == 0 ? <Text>0</Text> : <Spinner color={'supporting.lightGreen'} />}
                </HStack>

                <HStack style={styles.row} justifyContent={'space-between'} >
                    <Text style={styles.rowText} color={'secondary.white'}>USDT Coin</Text>
                    {walletData?.usdtBalance ?
                        <Text style={styles.rowText} color={'secondary.white'}>${priceFormatter(walletData?.usdtBalance)}</Text>
                        : walletData?.usdtBalance == 0 ? <Text>0</Text> : <Spinner color={'supporting.white'} />}
                </HStack>


                <HStack style={styles.row} justifyContent={'space-between'} >
                    <Text style={styles.rowText} color={'secondary.white'}>Other Assets</Text>
                    {walletData?.assetsBalance ?
                        <Text style={styles.rowText} color={'secondary.white'}>${priceFormatter(walletData?.assetsBalance)}</Text>
                        : walletData?.assetsBalance == 0 ? <Text>0</Text> : <Spinner color={'supporting.white'} />}
                </HStack>

                <VStack space={4} mt={5}>
                    <Button bg={'secondary.blue'} onPress={() => navigation.navigate('Market', { screen: 'CryptoList' })}>Trade</Button>
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
