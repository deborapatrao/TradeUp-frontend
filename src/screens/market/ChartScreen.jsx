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
} from "native-base";
import { StyleSheet} from "react-native";
import PriceStatic from '../../components/containers/market/PriceStatic';
import ChartComponent from '../../components/containers/market/chart';
import { useSelector, useDispatch } from "react-redux";


const ChartScreen = ({ navigation, route}) => {
  const {ticker} = route.params;

  // const dispatch = useDispatch();
	// const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const [dataBids, setDataBids] = useState([])
  const [dataAsks, setDataAsks] = useState([])
  const [dataCoin, setDataCoin] = useState([])
  const [loading, setLoading] = useState(true)

  const url= `https://api.binance.com/api/v3/depth?symbol=${ticker}&limit=10`;
  const url24=`https://api.binance.com/api/v3/ticker/24hr?symbol=${ticker}`;

   
    useEffect(() =>{
      loadOrders();
      loadOverview();
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
        // console.log(json.bids);
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
        <VStack w="100%" backgroundColor='#171122' safeArea>
            <Box >
                {/* <Box m={2}>
                  {dataCoin.priceChangePercent > 0 ? 
                    <Text>Price Per Unit <ChevronUpIcon style={{color:"#31c451", alignItems: 'center'}}/> {Math.floor(parseFloat(dataCoin.priceChangePercent) * 100) + '%'}</Text> : 
                    <Text>Price Per Unit <ChevronDownIcon style={{color:"#FF6666", alignItems: 'center'}}/> {Math.floor(parseFloat(dataCoin.priceChangePercent) * 100) + '%'}</Text> }
                    
                    <Text fontSize='4xl'>≈${parseFloat(dataCoin.prevClosePrice).toFixed(2)}</Text>
                  </Box>                 */}
                <PriceStatic ticker={ticker}/>

                {/* CHART BOX */}
                <Box>
                  {/* <ChartContainer navigation={navigation} /> */}
                    <ScrollView  bg={'primary.bg'} paddingX={4}> 
                      <Box>
                          <Box>
                              <ChartComponent ticker={ticker}/>
                          </Box>
                      </Box>
                  </ScrollView> 
                </Box>
                
                    {/* <Box style={styles.container}> */}
                <ScrollView>
                    <VStack 
                      space="2" 
                      m="1" 
                      px="2" 
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
                            <Text fontSize={'xs'}>-</Text>
                          </HStack>
                          <HStack justifyContent="space-between">
                            <Text fontSize={'xs'}>Vol 24h</Text>
                            <Text fontSize={'xs'}>{parseFloat(dataCoin.volume).toFixed(2)}</Text>
                          </HStack>
                          <HStack justifyContent="space-between">
                            <Text fontSize={'xs'}>Mkt Dominance</Text>
                            <Text fontSize={'xs'}>-</Text>
                          </HStack>
                        </Box>
                      </Stack>    
                    </VStack>
                  </ScrollView>
              </Box>
            <Box>
            <Divider mt={5} mb={2}/>
            <Heading size="sm" m={2}>Order Book</Heading>
            <Stack direction="row" mb="2" mt="1" mr="2" ml="2" justifyContent={'center'} >
              <Text>Price (USDT)</Text>
            </Stack>    
            <Stack direction="row" mb="0" mt="0" mr="2" ml="2" justifyContent={'space-around'} >
              <Text>Bids</Text>
              <Text>Asks</Text>
            </Stack>          
            <Divider/> 
            </Box>
            <Box style={styles.container}>
            {loading ? (<Text>Loading ...</Text>) : (
              <>
              <Box width={'50%'}>
              {dataBids.map((bids)=>(
                  <HStack key={bids[0]}  justifyContent={'space-between'}>
                  <Text fontSize={"sm"} color="#31c451" ml={2}>{parseFloat(bids[0]).toFixed(4)}</Text>
                  <Text fontSize={"sm"} color="#31c451">{parseFloat(bids[1]).toFixed(4)}</Text>
                  </HStack>
              ))}
              </Box>
              <Box width={'50%'}>
              {dataAsks.map((asks)=>(
                  <HStack ml={1} key={asks[0]} justifyContent={'space-between'}>
                  <Text fontSize={"sm"} color="#FF6666">{parseFloat(asks[0]).toFixed(4)}</Text>
                  <Text textAlign={'right'} mr={2} color="#FF6666">{parseFloat(asks[1]).toFixed(4)}</Text>
                  </HStack>
              ))}
              </Box>
              </>
            )}
            </Box>
          </VStack>
          <Box>
            <HStack justifyContent={'space-between'} mt={5}>
              <Button w={"49%"} alignSelf={'flex-start'} onPress={() => navigation.navigate('BuyAndSell', { ticker: ticker})}>Buy</Button>
              <Button w={"49%"} backgroundColor={'secondary.red'} alignSelf={'flex-start'} onPress={() => navigation.navigate('BuyAndSell', { ticker: ticker})}>Sell</Button>
            </HStack>
        </Box>
        </ScrollView>

        </>
    );
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    m:2,
  },
  text:{
    fontSize: 10
  },
});
export default ChartScreen;
