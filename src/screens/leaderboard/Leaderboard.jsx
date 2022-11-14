import React, { useState, useEffect} from "react";
import {
    Text,
    HStack,
    Divider,
    FlatList,
    Button,
    View,
	Image,
	VStack,
} from "native-base";
import Users from '../../assets/images/icons/alert-icon.png';
import { StyleSheet, ScrollView} from "react-native";

const Leaderboard = () => {
	const data = [
		{name: "Bruce",
		percentage: "5%",
		rank: 1,
		},
		{
		name: "Martha",
		percentage: "2%",
		rank: 2,
		},
		{
		name: "Alfred",
		percentage: "0.25%",
		rank: 3,
		},
		{
		name: "Gordon",
		percentage: "5%",
		rank: 4,
		},
		{
		name: "Bane",
		percentage: "0.25%",
		rank: 5,
		},
		{
		name: "Joker",
		percentage: "2%",
		rank: 6,
		},
		{
		name: "Harley",
		percentage: "0.25%",
		rank: 7,
		}		
	]


	return (
		<>
		<HStack justifyContent={'space-between'} ml={3} mr={3} mb={3} >
			<VStack backgroundColor={'black'}  flexGrow={1} alignItems={'center'}  h={'40'} justifyContent={'flex-end'} pb={'3'}>
				<Image source={Users} alt={'user-image'}  borderRadius={'50'} />
				<Text>{data[0].name}</Text>
				<Text>{data[0].percentage}</Text>
			</VStack>
			<VStack backgroundColor={'black'} flexGrow={2} alignItems={'center'} h={'40'} justifyContent={'center'}>
				<Image source={Users} alt={'user-image'} borderRadius={'50'} backgroundColor={'white'}/>
				<Text>{data[1].name}</Text>
				<Text>{data[1].percentage}</Text>
			</VStack>
			<VStack backgroundColor={'black'} flexGrow={1} alignItems={'center'} h={'40'} justifyContent={'flex-end'} pb={'3'}>
			<Image source={Users} alt={'user-image'}  borderRadius={'50'} w={'12'} h={'12'} backgroundColor={'white'}/>	
				<Text>{data[2].name}</Text>
				<Text>{data[2].percentage}</Text>
			</VStack>
		</HStack>	
		<ScrollView>
			<View ml={3} mr={3}>        
        		<HStack style={styles.column}>
        		  <Text>Your Rank: 95th</Text>
        		</HStack>

				{data.map((item) => (
					<HStack style={[styles.column, styles.tableLine]} alignItems={'center'}>
					<HStack space={4} alignItems={'center'}>
					  <Text style={styles.text}>{item.rank} </Text>
					  <Image source={Users} alt={'user-image'} />
					  <Text style={styles.text}>{item.name} </Text>
					</HStack>
					<HStack justifyContent={'flex-end'} w={'60%'}>
					<Text style={styles.text}>{item.percentage}</Text>
					</HStack>
				  </HStack>
					))}
				   
      	</View>
	  </ScrollView>
    </>
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

  
  });

export default Leaderboard;