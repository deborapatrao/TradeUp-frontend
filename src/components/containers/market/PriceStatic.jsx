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


const PriceStatic = ({ navigation }) => {
  const [dataCoin, setDataCoin] = useState([])
  const [loading, setLoading] = useState(true)
  
  const url24='https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT';

   
    useEffect(() =>{
      const intervalId = setInterval(() =>{
        loadOverview();
       }, 5000);      
      return () => clearInterval(intervalId) 
    }, [])  
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
        <Box m={2}>
            {dataCoin.priceChangePercent > 0 ? 
            <Text>Price Per Unit    
                <ChevronUpIcon 
                    style={{color:"#31c451", alignItems: 'center'}}/> 
            {Math.floor(parseFloat(dataCoin.priceChangePercent) * 100) + '%'}
            </Text> 
            : 
            <Text>Price Per Unit 
                <ChevronDownIcon 
                    style={{color:"#FF6666", alignItems: 'center'}}/> 
            {Math.floor(parseFloat(dataCoin.priceChangePercent) * 100) + '%'}
            </Text> }
            <Text fontSize='4xl'>≈${parseFloat(dataCoin.prevClosePrice).toFixed(2)}</Text>
        </Box>  
        </> 
        )

};


export default PriceStatic;