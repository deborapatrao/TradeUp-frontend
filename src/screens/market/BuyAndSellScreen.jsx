import React from 'react'
import {
    Box,
    Text,
    Input,
    Button
} from "native-base";
import axios from 'axios';
import BuyScreen from './buyAndSell/BuyAndSell';
import PriceStatic from '../../components/containers/market/PriceStatic';


const BuyAndSellScreen = ({ route }) => {
    const { ticker } = route.params;
    const [amount, setAmount] = React.useState(0)

    const handleChange = (amount) => {
        console.log(parseFloat(amount));
        if(!isNaN(parseFloat(amount))){
            setAmount(parseFloat(amount))
        }
    }

    const handleBuy = async () => {
        const data = {
            coinTicker: ticker,
            amount: parseFloat(amount),
            userId: 'KItp69rp3LbtIV9l5HseDudsd5P2'
        }
        
        try {
            const response = await axios.post('http://192.168.194.246:8080/api/buy', data)
            console.log(response.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleSell = async () => {
        const data = {
            coinTicker: ticker,
            amount: parseFloat(amount),
            userId: 'KItp69rp3LbtIV9l5HseDudsd5P2'
        }
        console.log(data);
        try {
            const response = await axios.post('http://192.168.194.246:8080/api/sell', data)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }  
    }

    

    return (
        <Box bgColor={'primary.bg'} flex={1}>
            <PriceStatic/>
            <BuyScreen/>
        </Box>
    );
};

export default BuyAndSellScreen;
