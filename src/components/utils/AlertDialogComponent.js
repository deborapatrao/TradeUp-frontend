import React, { useState, useEffect } from 'react';
import { Center, Button, AlertDialog, Text, Image, VStack } from "native-base";
import StaticResource from '../utils/resources.json'

const AlertDialogComponent = ({ alert, setAlert, navigation }) => {
    const staticData = StaticResource[0];

    const onClose = () => setAlert(false);
    const cancelRef = React.useRef(null);
   
    const viewHandle = () => {
        onClose();
        navigation.navigate('Resources', {
            screen: 'SampleResource',
            initial: false,
            params: {
                article: staticData
            }
        })
    }


    let data = {
        "id": "1",
        "title": "Understanding Basic Candlestick Charts",
        "description": "Candlestick charts are used by traders to determine possible price movement based on past patterns. Candlesticks are useful when trading as they show..",
        "urlToImage": "https://www.investopedia.com/thmb/pWBTORzzifDoVLg_mw8NmvQKccg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/UnderstandingBasicCandlestickCharts-01_2-4d7b49098a0e4515bbb0b8f62cc85d77.png",
        "age": "20",
        "source": "https://www.investopedia.com"

    };

    return (
        <Center >
            <AlertDialog isOpen={alert} w={'505'} ml={'-12'}>
                <AlertDialog.Content backgroundColor={'secondary.lightGray'}>
                        <Text ml={5} mt={3} fontSize={'xl'} color={'supporting.darkGreen'} fontWeight={'bold'}>Order Sucessfull</Text>
                    <AlertDialog.Body backgroundColor={'secondary.lightGray'} >
                        <Image height={140} source={{ uri: data.urlToImage }} alt={data.title}  />
                        <Text mt={2} mb={2} fontSize={'md'} color={'supporting.darkGreen'} fontWeight={'bold'}>{data.title}</Text>
                        <Text color={'black'} fontSize={'sm'}>{data.description} </Text>
                        <VStack mt={2} >
                            <Button w={'70%'} alignSelf={'center'} variant="unstyled" backgroundColor={'secondary.blue'} color={'white'} onPress={() => viewHandle()}>
                                View Resources
                            </Button>
                            <Button backgroundColor={'secondary.lightGray'} onPress={onClose} >
                                <Text color={'#7F7F7F'}> Close</Text>
                            </Button>
                        </VStack>
                    </AlertDialog.Body>
                </AlertDialog.Content>
            </AlertDialog>
        </Center>
    );
}

export default AlertDialogComponent;
