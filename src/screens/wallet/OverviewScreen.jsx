import React, { useEffect, useState} from 'react'
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



const OverviewScreen = ({ navigation }) => {
    const [walletData, setWalletData] = useState('');

    useEffect(() => {

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
                    <Heading style={styles.headingText} color={'supporting.lightGreen'}>18%</Heading>
                </HStack>

                <HStack style={styles.row} justifyContent={'space-between'} >
                    <Text style={styles.rowText} color={'secondary.white'}>Performance</Text>
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
                    <Heading style={styles.headingText} color={'supporting.lightGreen'}>${walletData.totalBalance}</Heading>
                </HStack>

                <HStack style={styles.row} justifyContent={'space-between'} >
                    <Text style={styles.rowText} color={'secondary.white'}>USDT Coin</Text>
                    <Text style={styles.rowText} color={'secondary.white'}>${walletData.usdtBalance}</Text>
                </HStack>


                <HStack style={styles.row} justifyContent={'space-between'} >
                    <Text style={styles.rowText} color={'secondary.white'}>Other Assets</Text>
                    <Text style={styles.rowText} color={'secondary.white'}>${walletData.assetsBalance}</Text>
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
