import React from 'react'
import { View, Text, HStack } from 'native-base'
import { StyleSheet } from 'react-native';

const CryptoItem = ({ coin }) => {
    // console.log(coin.symbol)
  return (
    <>
          <HStack style={[styles.column, styles.tableLine]}>
            <Text style={styles.text}>{coin.symbol} </Text>
            <Text style={styles.text}>{parseFloat(coin.lastPrice).toFixed(4)} </Text>
            <Text style={[styles.text, styles.percentage, coin.priceChangePercent >= 0 ? styles.percentagePositive : styles.percentageNegative]}>
              {Number.parseFloat(coin.priceChangePercent).toFixed(2)} %
              </Text>
          </HStack>
    </>
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