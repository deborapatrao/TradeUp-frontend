import React from 'react'
import { View, Text, HStack, Pressable, Image } from 'native-base'
import { StyleSheet } from 'react-native';
import { cryptoImages } from '../utils/assets';

const CryptoItem = ({ coin, navigation }) => {
  const assetImage = cryptoImages.find(imgItem => imgItem.ticker === coin.symbol).image;
  // navigation.navigate('Market', { screen: 'CryptoDetail', params: { ticker: coin.symbol } })
  return (
    // Passing params to the nested screens ....
    <Pressable onPress={() => navigation.navigate('CryptoDetail', { ticker: "BTCUSDT" })}>
      <HStack onPress style={[styles.column, styles.tableLine]} alignItems={'center'}>
        <HStack space={4} alignItems={'center'}>
          <Image source={assetImage} alt={"BTCUSDT"} style={{ width: 30, height: 30 }} />
          <Text style={styles.text}>{"BTCUSDT".slice(0, -4)} </Text>
        </HStack>
        <HStack justifyContent={'space-between'} w={'60%'}>
          <Text style={styles.text}>{parseFloat(coin.lastPrice).toFixed(4)} </Text>
          <Text style={[styles.text, styles.percentage, coin.priceChangePercent >= 0 ? styles.percentagePositive : styles.percentageNegative]}>
            {Number.parseFloat(coin.priceChangePercent).toFixed(2)} %
          </Text>
        </HStack>
      </HStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  column: {
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center'
  },

  tableLine: {
    backgroundColor: 'rgba(204, 204, 204, .1)',
    padding: 15,
    borderRadius: 5
  },

  text: {
    color: '#fff'
  },

  percentage: {
    borderRadius: 3,
    overflow: "hidden",
    paddingLeft: 4,
    paddingRight: 4,
    height: 22,
  },

  percentagePositive: {
    backgroundColor: '#31c451',
  },

  percentageNegative: {
    backgroundColor: '#ff6666',
  }
});

export default CryptoItem