import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Input,
    Button
} from "native-base";
import axios from 'axios';
import PriceStatic from '../../components/containers/market/PriceStatic';
import BuyAndSellComponent from './buyAndSell/BuyAndSell';


const BuyAndSellScreen = ({ route }) => {
    const [dataCoin, setDataCoin] = useState(0)
    const { ticker } = route.params;
    const [amount, setAmount] = React.useState(0)

    const url24=`https://api.binance.com/api/v3/ticker/24hr?symbol=${ticker}`;

    useEffect(() =>{
        loadOverview();
        const intervalId = setInterval(() =>{
          loadOverview();
         }, 5000);      
        return () => clearInterval(intervalId) 
      }, [])  
      
      function loadOverview() {
        fetch(url24)
        .then((response) => response.json())
        .then((json)=>{
          setDataCoin(json)
        })
        .catch((error)=>console.error(error))
        .finally(()=>console.log('finished'))
      }


    const handleChange = (amount) => {
        console.log(parseFloat(amount));
        if(!isNaN(parseFloat(amount))){
            setAmount(parseFloat(amount))
        }
    }

    

    return (
        <Box bgColor={'primary.bg'} flex={1}>
            <PriceStatic ticker={ticker}/>
            <BuyAndSellComponent price={dataCoin.askPrice} ticker={ticker} />
        </Box>
    );
};

export default BuyAndSellScreen;
