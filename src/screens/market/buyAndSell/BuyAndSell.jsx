import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    VStack,
    Text,
    HStack,
    Divider,
    ScrollView,
    Heading,
    Stack,
    Image,
} from "native-base";
import { StyleSheet, TextInput} from "react-native";
import  SubIcon from "../../../assets/images/icons/sub-icon.png";


const BuyAndSellComponent = ({ navigation }) => {
   
    const url= 'https://api.binance.com/api/v3/depth?symbol=ETHUSDT&limit=10';
    const url24='https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT';

return (
    <>
    <ScrollView>
    <VStack w="100%" backgroundColor='#171122' safeArea>
        <Box>
        <Button.Group  size="md">
        <Button
                                bgColor='secondary.blue'
                                size="md"
                                p={0}
                                px={3}
                            >
                                <Text>Buy</Text>
                            </Button>
                            <Button
                                bgColor='secondary.field'
                                size="md"
                                p={0}
                                px={3}
                            >
                                <Text>Sell</Text>
                            </Button>
                </Button.Group>
        </Box>
        <Box>
        <HStack backgroundColor={'primary.field'} justifyContent={'space-between'} m={3} mt={1} borderRadius={5}>
            <Button backgroundColor={'primary.field'} borderRightColor={'secondary.lightGray'} borderRightWidth={1} borderRadius={0} mt={1} mb={1}><Image source={SubIcon}/></Button>
            <TextInput color={'secondary.white'}></TextInput>
            <Button backgroundColor={'primary.field'} borderLeftColor={'secondary.lightGray'} borderLeftWidth={1} borderRadius={0} mt={1} mb={1}> + </Button>
        </HStack>
        <HStack backgroundColor={'primary.field'} justifyContent={'space-between'} m={3}  borderRadius={5}>
            <Button backgroundColor={'primary.field'} borderRightColor={'secondary.lightGray'} borderRightWidth={1} borderRadius={0} mt={1} mb={1}><Image source={SubIcon}/></Button>
            <TextInput color={'secondary.white'}></TextInput>
            <Button backgroundColor={'primary.field'} borderLeftColor={'secondary.lightGray'} borderLeftWidth={1} borderRadius={0} mt={1} mb={1}> + </Button>
        </HStack>
        <HStack backgroundColor={'primary.field'} justifyContent={'space-between'} m={3}  borderRadius={5}>
            <Button backgroundColor={'primary.field'} borderRightColor={'secondary.lightGray'} borderRightWidth={1} borderRadius={0} mt={1} mb={1}><Image source={SubIcon}/></Button>
            <TextInput color={'secondary.white'}></TextInput>
            <Button backgroundColor={'primary.field'} borderLeftColor={'secondary.lightGray'} borderLeftWidth={1} borderRadius={0} mt={1} mb={1}> + </Button>
        </HStack>
        </Box>
        <Box>
            <HStack justifyContent={'space-between'} m={3} >
                <Button w={"23%"} backgroundColor={'primary.field'}>25%</Button>
                <Button w={"23%"} backgroundColor={'primary.field'}>50%</Button>
                <Button w={"23%"} backgroundColor={'primary.field'}>75%</Button>
                <Button w={"23%"} backgroundColor={'primary.field'}>100%</Button>
            </HStack>
        </Box>
      </VStack>
    <Button w={'93%'} alignSelf={'flex-start'} onPress={() => navigation.navigate('PriceAlert')} ml={3} mr={3} mt={10}>Buy</Button>
    </ScrollView>

    </>
);
};


export default BuyAndSellComponent;
