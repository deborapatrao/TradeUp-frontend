import React, { useState, useEffect } from "react";
import {
	Text,
	HStack,
	Divider,
	FlatList,
	Button,
	View,
	Image,
	Center,
	Box,
} from "native-base";
import Profile from "../../assets/images/icons/profile.png";
import Down from "../../assets/images/icons/down.png";
import Up from "../../assets/images/icons/up.png";
import { StyleSheet, ScrollView } from "react-native";
import { getTopTraders } from "../../utils/requests";
import { useSelector } from "react-redux";
import Loader from "../../components/utils/Loader";

const LeaderboardHome = ({ topTraders }) => {

	return (
		<>
			<ScrollView>
				<View>
					{topTraders.traders ? (topTraders.traders.map((item, index) => (
						<HStack
							style={[styles.column, styles.tableLine]}
							alignItems={"center"}
                            key={index}
						>
							<HStack space={4} alignItems={"center"}>
								<Text style={styles.text}>{item.rank} </Text>
								<Image
									source={{ uri: item.picture ? item.picture : "https://firebasestorage.googleapis.com/v0/b/trade-up-bc1be.appspot.com/o/user_placeholder.jpg?alt=media&token=f4a15f20-ca35-449f-bf12-394e246d8be2", }}
									alt={"user-image"}
									style={styles.imageList}
								/>
								<Text style={styles.text}>{item.username.substring(0,9)}</Text>
							</HStack>
							<HStack justifyContent={"flex-end"} w={"50%"}>
							<HStack justifyContent={"flex-start"} space={2} >
								{item.performance > 0 ? 
								<Image source={Up} style={styles.positivePercentage} alt="up"/>  : 
								<Image source={Down} style={styles.negativePercentage} alt="down"/>}
								<Text style={styles.percentage}>
									{item.performance.toFixed(2)}%
								</Text> 
							</HStack>
							</HStack>
						</HStack>
					))) : (<Loader />)}
				</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: "#171122",
	},

	column: {
		justifyContent: "space-between",
		marginBottom: 5,
		marginTop: 3,
		textAlign: "center",
	},

	tableLine: {
		backgroundColor: "rgba(204, 204, 204, .1)",
		padding: 10,
		borderRadius: 5,
	},

	text: {
		color: "#fff",
		paddingLeft: 8,
		fontWeight: "bold",
	},

	button: {
		justifyContent: "center",
	},

	percentage: {
		borderRadius: 3,
		overflow: "hidden",
		paddingLeft: 4,
		marginRight: 4,
		fontWeight: "bold",
	},
	laterals: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	central: {
		flexGrow: 2,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 15,
	},
	trapezoid: {
		width: "90%",
		height: 0,
		borderTopWidth: 40,
		borderTopColor: "rgba(128, 128, 128, 0.4)",
		borderLeftWidth: 50,
		borderLeftColor: "transparent",
		borderRightWidth: 50,
		borderRightColor: "transparent",
		borderStyle: "solid",
		backgroundColor: "red",
	},

	positivePercentage: {
		marginLeft: 2, 
		color: "#31c451", 
		alignSelf: 'center',
		marginTop: 2,
	},
	negativePercentage: {
		marginLeft: 2, 
		color: "#FF6666", 
		alignSelf: 'center',
		marginBottom: 2,
	},
	imageList: {
		height: 35,
		width: 35,
		borderRadius: 50,
	},
	imageLaterals: {
		height: 80,
		width: 80,
		borderRadius: 50,
	},
	imageCentral: {
		height: 120,
		width: 120,
		borderRadius: 50,
	},
	leaders: {
		justifyContent: "space-between",
		marginLeft: 3,
		marginRigh: 3,
		marginBottom: 3,
		marginTop: 4,
	},
});

export default LeaderboardHome;
