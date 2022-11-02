import React from 'react'
import { View, Text, HStack, Pressable } from 'native-base'
import { StyleSheet } from 'react-native';

const CryptoItem = ({ coin, navigation }) => {
    
  return (
    // Passing params to the nested screens ....
    <Pressable onPress={() => navigation.navigate('CryptoDetail', {
      screen: 'Chart',
      params: { ticker: coin.symbol },
    })}>
          <HStack onPress style={[styles.column, styles.tableLine]}>
<<<<<<< HEAD
            <Text style={styles.text}>{coin.symbol.slice(0, -4)} </Text>
<<<<<<< HEAD
            <Text style={styles.text}>{parseFloat(coin.prevClosePrice).toFixed(4)} </Text>
=======
            <Text style={styles.text}>{coin.symbol} </Text>
            <Text style={styles.text}>{parseFloat(coin.lastPrice).toFixed(4)} </Text>
>>>>>>> 8941541 (CAP-30 images added, new token for auth added, overview and assets screen added)
=======
            <HStack justifyContent={'space-between'} w={'60%'}>
            <Text style={styles.text}>{parseFloat(coin.lastPrice).toFixed(4)} </Text>
>>>>>>> af5b61c (small fixes + numer formatters)
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
  
    text:{
      color: '#fff'
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
    }
  });

export default CryptoItem