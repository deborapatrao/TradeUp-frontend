import React, { useState, useEffect } from 'react'
import {
    Box,
    Text,
    FlatList,
    HStack,
    Button,
    Divider,
} from "native-base";
import {StyleSheet} from 'react-native';
import { getWalletData } from '../../utils/requests';
import AssetItem from '../../components/listItems/AssetItem';

import { useSelector } from "react-redux";



const AssetsScreen = ({ navigation }) => {
    const [assetData, setAssetData] = useState(null);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log(user);
        // console.log('check2');
        // if (user) {
        // } else {
        //     console.log('not authenticated 2');
        // }
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('AssetsScreen focused');
            const data = await getWalletData('/wallet/assets');
            console.log('Data: ', data);
            setAssetData(data.assets);
        });
        loadCoins();
        return unsubscribe;

    }, [navigation]);

    async function loadCoins(){
        try {
          const reponse = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?${symbolsString}`);
          

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

    return (
        <Box bgColor={'primary.bg'} flex={1} px={4}>

<HStack style={styles.column}>
          <Button style={styles.background} 
          onPress={() => handleTypeChange("alphabetical")}
          >
            <Text style={styles.text}>Pair</Text>
            <Text style={styles.text}>USDT</Text>
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
                data={assetData}
                style={{ paddingHorizontal: 5 }}
                renderItem={({ item }) => {
                    return <AssetItem asset={item} />
                }}
            />
        </Box>
    );
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
  
    text:{
      color: '#fff'
    },
  
  
  });

export default AssetsScreen;
