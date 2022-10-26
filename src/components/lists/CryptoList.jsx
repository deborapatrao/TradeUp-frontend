import React, { useState, useEffect} from "react";
import {
    Box,
    VStack,
    Center,
    Text,
    HStack,
    Divider,
    Image,
    FlatList,
    Button,
    NativeBaseProvider,
    Heading,
    Stack,
    View,
    Row,
} from "native-base";
import { StyleSheet, ScrollView} from "react-native";
import CryptoItem from "../listItems/CryptoItem";
import Arrow from '../../assets/images/icons/alert-icon.png'


const axios = require("axios");


const CryptoList = ({ navigation }) => {
  // const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState("standard");

  //coins supported by our app
  const symbols = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "XRPUSDT",
    "ADAUSDT",
    "SOLUSDT",
    "DOGEUSDT",
    "TRXUSDT",
  ];

    //create string to use on fetch with the coins we will use on our project
    const symbolsString = `symbols=[${symbols.map(symbol => `"${symbol}"`)}]`;

  useEffect(() => {
    loadCoins();

    const intervalId = setInterval(loadCoins, 5000);

    return () => clearInterval(intervalId);

  }, [type, toggle])

  
  async function loadCoins(){
    try {
      const reponse = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?${symbolsString}`);
      // console.log(JSON.stringify(reponse.data, null ,2));

      let sortedData = [];

        switch(type){
          case "24":
            sortedData =  reponse.data.sort((a, b) => {
              return toggle
              ?a.priceChangePercent - b.priceChangePercent
              :b.priceChangePercent - a.priceChangePercent  
            });
            
            break;
          case "alphabetical":
            sortedData = data.sort((a, b) => {
              return toggle
              ?a.symbol.localeCompare(b.symbol)
              :b.symbol.localeCompare(a.symbol)
            });
            break;
          default:
            sortedData = reponse.data
          } 

          setData([...sortedData])

    } catch (error) {
      console.log(error)
    }
  }


  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    setToggle(!toggle)
  }

  return(
    <>
    
      <View>
        
        <HStack style={styles.column}>
          <Button style={styles.background} 
          onPress={() => handleTypeChange("alphabetical")}
          >
            <Text style={styles.text}>Pair</Text>
            <Text style={styles.text}>USDT</Text>
            <Image source={Arrow}
            alt={'arrow icon'}
            style={styles.arrow}/>
          </Button>

          <Button style={styles.background} >
            <Text style={styles.text}>Last</Text>
            <Text style={styles.text}>price</Text>
          </Button>

          <Button style={styles.background} 
          onPress={() => handleTypeChange('24')}
          >
            <Text style={{...styles.text, width: 60, textAlign: 'center'}}>24H Change</Text>
            {/* <Text style={styles.text}>Change</Text> */}
          </Button>
        </HStack>
        
        <Divider />
        
        <FlatList 
          data={data}
          style={{ paddingHorizontal: 5 }}
          renderItem={({ item }) => {
            return <CryptoItem navigation={navigation} coin={item} />
          }}
          keyExtractor={item => item.symbol}
        />

      
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#171122',
  }, 

  column: {
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },

  tableLine: {
    backgroundColor: 'rgba(204, 204, 204, .1)',
    padding: 15,
    borderRadius: 5
  },

  text:{
    color: '#fff'
  },

  button: {
    justifyContent: 'center'
  },

  percentage: {
    borderRadius: 3,
    overflow: "hidden",
    paddingLeft: 4,
    paddingRight: 4
  },

  percentagePositive: {
    backgroundColor: '#31c451',
  },

  percentageNegative: {
    backgroundColor: '#ff6666',
  },

  arrow: {
    borderWidth: '1px',
    borderColor: 'red',
    borderStyle: 'solid',
    backgroundColor: 'green'
  },
});


export default CryptoList
