import React, { useState, useEffect } from 'react'
import {
  Box,
  Text,
  FlatList,
  HStack,
  Button,
  Divider,
  SearchIcon,
  Input,
  Checkbox
} from "native-base";
import { StyleSheet } from 'react-native';
import { getWalletData } from '../../utils/requests';
import AssetItem from '../../components/listItems/AssetItem';

import { useSelector } from "react-redux";



const AssetsScreen = ({ navigation }) => {
  const [assetData, setAssetData] = useState(null);
  const [notNullAssetData, setNotNullAssetData] = useState(null);
  const [checkZero, setCheckZero] = useState(true);
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
      const newData = data.assets.filter((item) => item.quantity > 0);
      setAssetData(data.assets);
      setNotNullAssetData(newData);
    });
    loadCoins();
    return unsubscribe;

  }, [navigation]);

  async function loadCoins() {
    try {
      const reponse = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?${symbolsString}`);


      let sortedData = [];

      switch (type) {
        case "24":
          sortedData = reponse.data.sort((a, b) => {
            return toggle
              ? a.priceChangePercent - b.priceChangePercent
              : b.priceChangePercent - a.priceChangePercent
          });

          break;
        case "alphabetical":
          sortedData = data.sort((a, b) => {
            return toggle
              ? a.symbol.localeCompare(b.symbol)
              : b.symbol.localeCompare(a.symbol)
          });
          break;
        default:
          sortedData = reponse.data
      }

      setAssetData([...sortedData])

    } catch (error) {
      console.log(error)
    }
  }


  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    setToggle(!toggle)
  }

  const handleCheckbox = (status) => {
    setCheckZero(status)
  }

  return (
    <Box bgColor={'primary.bg'} flex={1} px={4}>
      <HStack space={4} mt={4} justifyContent={'space-between'} px={2}>
        <Checkbox
          value="zero"
          backgroundColor={"#231D30"}
          borderColor={"#231D30"}
          onChange={(nextValue) => handleCheckbox(nextValue)}
          isChecked={checkZero}
          _checked={{ borderColor: 'supporting.lightGreen', backgroundColor: 'supporting.lightGreen' }}
          _pressed={{ borderColor: 'supporting.lightGreen' }}
          _icon={{ color: 'white' }}
        >
          Hide 0 balances
        </Checkbox>

        <Input
          placeholder='Search a coin'
          placeholderTextColor={'secondary.darkGray'}
          fontSize={'md'}
          borderRadius={5}
          borderColor={'primary.field'}
          focusOutlineColor={'gray.400'}
          backgroundColor='primary.field'
          w={160}
          h='80%'
          InputRightElement={
            <SearchIcon size={5} ml={2} color={'secondary.darkGray'} mr={2} />
          } />
      </HStack>

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
          <Text style={{ ...styles.text, width: 60, textAlign: 'center' }}>24H Change</Text>
          {/* <Text style={styles.text}>Change</Text> */}
        </Button>
      </HStack>

      <Divider />

      <FlatList
        data={checkZero ? notNullAssetData : assetData}
        style={{ paddingTop: 10 }}
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

  text: {
    color: '#fff'
  },
  checkbox: {
    backgroundColor: "#231D30",
    _checked: {
      backgroundColor: "red",
    },
    _icon: {
      color: 'white'
    },
    _pressed: {
      color: 'white'
    }
  }


});

export default AssetsScreen;
