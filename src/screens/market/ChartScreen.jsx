import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    VStack,
    Center,
    Text,
    HStack,
    Divider,
    ScrollView,
    Heading,
    Stack,
    Select,
    ChevronDownIcon,
    ChevronUpIcon,
} from "native-base";
import { StyleSheet} from "react-native";
import axios from 'axios';


const ChartScreen = ({ navigation }) => {
  const [dataBids, setDataBids] = useState([])
  const [dataAsks, setDataAsks] = useState([])
  const [dataCoin, setDataCoin] = useState([])
  const [loading, setLoading] = useState(true)

  const url= 'https://api.binance.com/api/v3/depth?symbol=ETHUSDT&limit=10';
  const url24='https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT';

    const coin_data = [
        {
          id: '1',
          symbol: 'BTS_BTC',
          displayName: 'BTS/BTC',
          state: "NORMAL",
          visibleStartTime: 1659018816626,
          tradableStartTime: 1659018816626,
          symbolTradeLimit:[{
            priceScale: '10',
            quantityScale: 0,
            amountScale: 8,
            minQuantity: "100",
            minAmount: "0.00001",
            highestBid: "0",
            lowestAsk: "0"
          }]
        }
      ];
    
    useEffect(() =>{
      const intervalId = setInterval(() =>{
        loadOrders();
        loadOverview();
       }, 5000);      
      return () => clearInterval(intervalId) 
    }, [])  


    function loadOrders() {
      fetch(url)
      .then((response) => response.json())
      .then((json)=>{
        setDataBids(json.bids) 
        setDataAsks(json.asks)})
      .catch((error)=>console.error(error))
      .finally(()=>setLoading(false))
    }
    function loadOverview() {
      fetch(url24)
      .then((response) => response.json())
      .then((json)=>{
        setDataCoin(json)})
      .catch((error)=>console.error(error))
      .finally(()=>setLoading(false))
    }


    return (
        <>
         <ScrollView>
        <VStack w="100%" safeArea>
            <Box >
                <Box m={2}>
                  {dataCoin.priceChangePercent > 0 ? 
                  <Text>Price Per Unit <ChevronUpIcon style={{color:"#31c451", alignItems: 'center'}}/> {Math.floor(parseFloat(dataCoin.priceChangePercent) * 100) + '%'}</Text> : 
                  <Text>Price Per Unit <ChevronDownIcon style={{color:"#FF6666", alignItems: 'center'}}/> {Math.floor(parseFloat(dataCoin.priceChangePercent) * 100) + '%'}</Text> }

                    <Text fontSize='4xl'>≈${parseFloat(dataCoin.prevClosePrice).toFixed(2)}</Text>
                </Box>                
                <Box m={2}>
                    <Text>Chart  with  change </Text>
                </Box>
                    {/* <Box style={styles.container}> */}
                <ScrollView>
                    <VStack 
                      space="2" 
                      m="1" 
                      px="2" 
                      borderColor='black'
                      borderWidth={2}
                      borderRadius={5}
                      width="auto"
                    >
                      <Heading size="md">Overview</Heading>
                      <Stack direction="row" mb="2" mt="1" justifyContent={'space-between'} >
                        <Box  width={'49%'}>
                          <HStack justifyContent="space-between" >
                            <Text fontSize={'xs'} >High</Text>
                            <Text fontSize={'xs'}color="#31c451" >{parseFloat(dataCoin.highPrice).toFixed(2)}</Text>
                          </HStack>
                          <HStack justifyContent="space-between">
                            <Text fontSize={'xs'}>Low</Text>
                            <Text fontSize={'xs'}color="#FF6666">{parseFloat(dataCoin.lowPrice).toFixed(2)}</Text>
                          </HStack>
                          <HStack justifyContent='space-between'>
                            <Text fontSize={'xs'}>Open</Text>
                            <Text fontSize={'xs'}>{parseFloat(dataCoin.openPrice).toFixed(2)}</Text>
                          </HStack>
                        </Box>
                        <Box  width={'49%'}>
                          <HStack justifyContent="space-between">
                            <Text fontSize={'xs'}>Mkt Cap</Text>
                            <Text fontSize={'xs'}>IDR 15,133.7 T</Text>
                          </HStack>
                          <HStack justifyContent="space-between">
                            <Text fontSize={'xs'}>Vol 24h</Text>
                            <Text fontSize={'xs'}>{parseFloat(dataCoin.volume).toFixed(2)}</Text>
                          </HStack>
                          <HStack justifyContent="space-between">
                            <Text fontSize={'xs'}>Mkt Dominance</Text>
                            <Text fontSize={'xs'}>46%</Text>
                          </HStack>
                        </Box>
                      </Stack>    
                      <Divider/>
                    </VStack>
                  </ScrollView>
              </Box>
            <Box>
            <Divider mt={5} mb={2}/>
            <Heading size="sm" m={2}>Order Book</Heading>
            <Stack direction="row" mb="2" mt="1" mr="2" ml="2" justifyContent={'space-between'} >
              <Text>Amount</Text>
            </Stack>              
            </Box>
            <Box style={styles.container}>
            {loading ? (<Text>Loading ...</Text>) : (
              <>
              <Box width={'50%'}>
              {dataBids.map((bids)=>(
                  <HStack justifyContent={'space-between'}>
                  <Text fontSize={"sm"} color="#31c451" ml={2}>{parseFloat(bids[0]).toFixed(4)}</Text>
                  <Text fontSize={"sm"} color="#31c451">{parseFloat(bids[1]).toFixed(4)}</Text>
                  </HStack>
              ))}
              </Box>
              <Box width={'50%'}>
              {dataAsks.map((asks)=>(
                  <HStack justifyContent={'space-between'}>
                  <Text fontSize={"sm"} color="#FF6666">{parseFloat(asks[0]).toFixed(4)}</Text>
                  <Text textAlign={'right'} mr={2} color="#FF6666">{parseFloat(asks[1]).toFixed(4)}</Text>
                  </HStack>
              ))}
              </Box>
              </>
            )}
            </Box>
          </VStack>
        <Button alignSelf={'flex-start'} onPress={() => console.log('check')}>BuyAndSell</Button>
        </ScrollView>
        </>
    )

};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    borderColor: 'black',
    borderWidth: 1,
    m:2,
  },
  text:{
    fontSize: 10
  },
});
export default ChartScreen;
