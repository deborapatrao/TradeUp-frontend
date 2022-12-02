import React, { useState, useEffect}  from 'react';
import { Center, Button, AlertDialog, Text, Image, VStack} from "native-base";
import axios from "axios";
// import ResourcesList from "../resources.json";

const AlertDialogComponent = ({ alert, setAlert }) => {
    // const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setAlert(false);
    const cancelRef = React.useRef(null);
    // const [data, setData] = useState([]);

    // const apiKey= '1a01a2c1e3e54c10b6e7cfca9c84d7cd';

    // useEffect(() => {
    //     getArticle()
    // }, [])

    // async function getArticle(){
    //     try {
    //         const response = await axios.get(`https://newsapi.org/v2/top-headlines?q=crypto&pageSize=1&apiKey=${apiKey}`);

    //         setData(response.data.articles);
    //         console.log(data);

    //     }catch (error) {
    //         console.log(error)
    //       }
    // }


    let data = {
            "id": "1",
            "title": "Understanding Basic Candlestick Charts",
            "description": "Candlestick charts are used by traders to determine possible price movement based on past patterns. Candlesticks are useful when trading as they show four price points (open, close, high, and low) throughout the period of time the trader specifies.",
            "urlToImage": "https://www.investopedia.com/thmb/pWBTORzzifDoVLg_mw8NmvQKccg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/UnderstandingBasicCandlestickCharts-01_2-4d7b49098a0e4515bbb0b8f62cc85d77.png",
            "age": "20",
            "source": "https://www.investopedia.com"
          
    };

    return (
        <Center>
            <AlertDialog isOpen={alert} w={'100%'} >
                <AlertDialog.Content backgroundColor={'secondary.lightGray'}>
                    <AlertDialog.Header backgroundColor={'secondary.lightGray'}>
                        <Text color={'supporting.darkGreen'} fontWeight={'bold'}>Order Sucessfull</Text>
                    </AlertDialog.Header>
                    <AlertDialog.CloseButton onPress={onClose} />
                    <AlertDialog.Body backgroundColor={'secondary.lightGray'} mt={2} mb={2}>
                        <Image height={140} source={{uri:data.urlToImage}} alt={data.title} borderRadius={5}/>
                        <Text mt={2} mb={2} color={'supporting.darkGreen'} fontWeight={'bold'}>{data.title}</Text>
                        <Text color={'black'} fontSize={'sm'}>{data.description} </Text>
                    {/* <AlertDialog.Footer backgroundColor={'secondary.lightGray'}> */}
                        <VStack w={'100%'} mt={2}>
                            <Button variant="unstyled" backgroundColor={'secondary.blue'} color={'white'}>
                                View Resources
                            </Button>
                            <Button backgroundColor={'secondary.lightGray'} onPress={onClose} >
                               <Text color={'#7F7F7F'}> Close</Text> 
                            </Button>
                        </VStack>
                        </AlertDialog.Body>
                    {/* </AlertDialog.Footer> */}
                </AlertDialog.Content>
            </AlertDialog>
        </Center>
    );
}

export default AlertDialogComponent;
