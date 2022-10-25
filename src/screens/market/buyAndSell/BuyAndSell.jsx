import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    VStack,
    Text,
    HStack,
    Select,
    ScrollView,
    Image,
    Input,
} from "native-base";
import { StyleSheet} from "react-native";
import  SubIcon from "../../../assets/images/icons/sub-icon.png";
import AddIcon from "../../../assets/images/icons/add-icon.png"


const BuyAndSellComponent = ({ navigation, ticker}) => {
    const[priceValue, setPriceValue] = useState(0);
    const[amountValue, setAmountValue] = useState('')
    const[totalValue, setTotalValue] = useState('')
    const[service, setService] = useState();
    const[buyActive, setBuyActive] = useState(true);
    const[sellActive, setSellActive] = useState(false);

    const url24=`https://api.binance.com/api/v3/ticker/24hr?symbol=${ticker}`;

    useEffect(() =>{
        loadOverview();
      }, [])  
      
      function loadOverview() {
        fetch(url24)
        .then((response) => response.json())
        .then((json)=>{
            setPriceValue(json.askPrice)
        })
        .catch((error)=>console.error(error))
        // .finally(()=>console.log('finished'))
      }

   
    const url= 'https://api.binance.com/api/v3/depth?symbol=ETHUSDT&limit=10';


    const handleClick = ()=>{
        console.log(`price from value is ${priceValue}`);
        console.log(`price from amount is ${amountValue}`);
        console.log(`price from total is ${totalValue}`);
    }

    

    
    const handleBuySellChange = (btn) =>{
        if(btn === "sell"){
            setBuyActive(false)
            setSellActive(true)
        }else{
            setBuyActive(true)
        setSellActive(false)
    }
}

const handleAddBtn = () => {
    console.log(priceValue);
    const newPrice = parseFloat(priceValue) + 1
    console.log(newPrice);
    setPriceValue(newPrice)
}


const handlePriceValueChange=(txt)=>{
    const newPrice = parseFloat(txt)
    if(!isNaN(newPrice)){
        setPriceValue(newPrice)
    } else {
        console.log('nope');
        setPriceValue(0)
    }
}

const handleAmountChange = (txt) => {
    const newPrice = parseFloat(txt)
    if(!isNaN(newPrice)){
        setAmountValue(newPrice)
    } else {
        console.log('nope');
        setAmountValue('')
    }
    if(txt !== ''){
        const newTotalValue = parseFloat(priceValue) * newPrice
        setTotalValue(newTotalValue)
    } else {
        setTotalValue('')
    }
}

const handleTotalChange = (txt) => {
    const newPrice = parseFloat(txt)
    if(!isNaN(newPrice)){
        setTotalValue(newPrice)
    } else {
        console.log('nope');
        setTotalValue('')
    }

    if(txt !== '') {
        const newAmountValue = newPrice / parseFloat(priceValue) 
        setAmountValue(newAmountValue)
    } else {
        setAmountValue('')
    }
}

const handleBuy = async () => {
    const data = {
        coinTicker: ticker,
        amount: parseFloat(totalValue),
        userId: 'KItp69rp3LbtIV9l5HseDudsd5P2'
    }
    console.log(data);
    
    // try {
    //     const response = await axios.post('http://192.168.194.246:8080/api/buy', data)
    //     console.log(response.data);
        
    // } catch (error) {
    //     console.log(error);
    // }
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
    <>
    <ScrollView>
    <VStack w="100%" backgroundColor='#171122' safeArea>
        <HStack ml={3} mb={3} mt={5} mr={3} justifyContent={'space-between'}>
            <Button.Group isAttached>
                <Button
                    onPress={() => handleBuySellChange("buy")}
                    flexBasis={'15%'}
                    backgroundColor={buyActive === true ? 'secondary.blue' : 'primary.field'}
                >
                    <Text>Buy</Text>
                </Button>
                <Button
                onPress={() => handleBuySellChange("sell")}
                flexBasis={'15%'}
                backgroundColor={sellActive === true ? 'secondary.blue' : 'primary.field'}
                >
                    <Text>Sell</Text>
                </Button>
            </Button.Group>
            <Select selectedValue={service} flexBasis={'50%'} accessibilityLabel="Choose Service" placeholder="Choose Service" 
                onValueChange={itemValue => setService(itemValue)}>
               <Select.Item label="Limit" value="limit" />
               <Select.Item label="Market" value="market" />
            </Select>
        </HStack>
        <Box>
            <HStack 
                backgroundColor={'primary.field'}
                justifyContent={'space-between'}
                m={3} 
                mt={1} 
                pt={1.5}
                pb={1.5}
                borderRadius={5}>
                <Button 
                     backgroundColor={'primary.field'} 
                     borderRightColor={'secondary.lightGray'} 
                     borderRightWidth={1} 
                     borderRadius={0} 
                     flexBasis={'15%'}
                ><Image  alt={'Substract'} source={SubIcon}/></Button>
                <Input                      
                    color={'secondary.white'} 
                    variant={'unstyled'}
                    flexBasis={'70%'} 
                    onChangeText={text => handlePriceValueChange(text)} 
                    value={`${priceValue}`}
                    keyboardType={'numeric'}
                    // defaultValue={`${priceValue}`}
                    // keyboardType={'number-pad'}
                    textAlign={'center'}
                    />
                <Button  backgroundColor={'primary.field'} 
                    borderLeftColor={'secondary.lightGray'} 
                    borderLeftWidth={1} 
                    borderRadius={0}  
                    pt={1} 
                    pb={1}
                    flexBasis={'15%'}
                    onPress={() => handleAddBtn()}>
                    <Image w={4} h={4} alt={'Add'} source={AddIcon}/> 
                </Button>
            </HStack>
            <HStack 
                backgroundColor={'primary.field'}
                justifyContent={'space-between'}
                m={3} 
                mt={1} 
                pt={1.5}
                pb={1.5}
                borderRadius={5}
            >
                <Button
                     backgroundColor={'primary.field'} 
                     borderRightColor={'secondary.lightGray'} 
                     borderRightWidth={1} 
                     borderRadius={0} 
                     pt={1} 
                     pb={1}
                     flexBasis={'15%'}>
                    <Image alt={'Substract'} source={SubIcon}/>
                </Button>
                <Input 
                    color={'secondary.white'} 
                    variant={'unstyled'}
                    flexBasis={'70%'}    
                    textAlign={'center'}                
                    keyboardType={'number-pad'}
                    onChangeText={text => handleAmountChange(text)} 
                    value={`${amountValue}`}
                    placeholder={'Amount Coin'}
                    />
                <Button 
                    backgroundColor={'primary.field'} 
                    borderLeftColor={'secondary.lightGray'} 
                    borderLeftWidth={1} 
                    borderRadius={0}  
                    pt={1} 
                    pb={1}
                    flexBasis={'15%'}>
                    <Image w={4} h={4} alt={'Add'} source={AddIcon}/> 
                </Button>
            </HStack>
            <HStack 
                backgroundColor={'primary.field'}
                justifyContent={'space-between'}
                m={3} 
                mt={1} 
                pt={1.5}
                pb={1.5}
                borderRadius={5}
            >
                <Button 
                     backgroundColor={'primary.field'} 
                     borderRightColor={'secondary.lightGray'} 
                     borderRightWidth={1} 
                     borderRadius={0} 
                     pt={1} 
                     pb={1}
                     flexBasis={'15%'}>
                    <Image alt={'Substract'} source={SubIcon}/>
                </Button>
                <Input  
                    color={'secondary.white'} 
                    variant={'unstyled'}
                    flexBasis={'70%'} 
                    textAlign={'center'}
                    keyboardType={'number-pad'}
                    onChangeText={text => handleTotalChange(text)} 
                    value={`${totalValue}`}
                    placeholder={'Total USDT'}
                    />
                <Button 
                     backgroundColor={'primary.field'} 
                     borderLeftColor={'secondary.lightGray'} 
                     borderLeftWidth={1} 
                     borderRadius={0}  
                     pt={1} 
                     pb={1}
                     flexBasis={'15%'}>
                     <Image w={4} h={4}  alt={'Add'} source={AddIcon}/> 
                 </Button>
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
      {sellActive ?  
      <Button 
        w={'93%'} 
        alignSelf={'flex-start'} 
        ml={3} 
        mr={3} 
        mt={10} 
        backgroundColor={'secondary.red'}
        onPress={handleClick} >Sell</Button> :
        <Button 
        w={'93%'} 
        alignSelf={'flex-start'} 
        ml={3} 
        mr={3} 
        mt={10} 
        backgroundColor={'secondary.blue'}
        onPress={handleBuy} >Buy</Button> 

      }
      {/* <Button w={'93%'} alignSelf={'flex-start'} onPress={handleClick} ml={3} mr={3} mt={10}>Buy</Button> */}

    {/* <Button w={'93%'} alignSelf={'flex-start'} onPress={() => navigation.navigate('PriceAlert')} ml={3} mr={3} mt={10}>Buy</Button> */}
    </ScrollView>

    </>
);
};

const styles = StyleSheet.create({
    togglebtns:{
        backgroundColor: 'primary.field',
    },
    containers: {
        backgroundColor: 'primary.field',
        justifyContent: 'space-between', 
        m: 3, 
        mt: 1, 
        borderRadius: 5,
    },
    containerBtnLft:{
        backgroundColor: 'primary.field',
        flexBasis: '15%', 
        borderRightColor: 'secondary.lightGray',
        borderRightWidth: 1, 
        borderRadius: 0, 
        mt: 1, 
        mb: 1,
    },
    containerBtnRt:{
        backgroundColor: 'primary.field',
        flexBasis: '15%', 
        borderLeftColor: 'secondary.lightGray', 
        borderLeftWidth: 1, 
        borderRadius: 0, 
        mt: 1, 
        mb: 1,
      },
    containerInput:{
        color: "white",
        flexBasis: '80%', 
        variant: 'unstyled',
      },
  });


export default BuyAndSellComponent;
