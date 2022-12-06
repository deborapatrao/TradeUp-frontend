import React, { useState, useEffect } from "react";
import {
	Text,
	HStack,
	Divider,
	FlatList,
	Button,
	View,
	Image,
	VStack,
	Box,
} from "native-base";
import Profile from "../../assets/images/icons/profile.png";
import { StyleSheet, ScrollView } from "react-native";
import { getTopTraders } from "../../utils/requests";
import { useSelector } from "react-redux";
import Loader from "../../components/utils/Loader";

const LeaderboardHome = ({ topTraders }) => {

	// const { user } = useSelector((state) => state.auth);
	// const [topTraders, setTopTraders] = useState([]);

	// useEffect(() => {
	// 	loadTopTraders();
	// }, []);

	// // useEffect(() => {
    // //     const checkedFocus = navigation.addListener('focus', async () => {
    // //         await loadTopTraders();
    // //         console.log('Top Traders Home focused');
    // //     });

    // //     return checkedFocus;
	// // }, [navigation]);

	// const loadTopTraders = async () => {
    //     try {
    //         const datas = await getTopTraders("/leaderboard", user.location.city);
    //         setTopTraders(datas);  
    //     } catch (error) {
    //         console.log(error);
    //     }
	// };

	const data = [
		{ name: "Bruce", percentage: "5%", rank: 1 },
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
			percentage: "0.35%",
			rank: 7,
		},
		{
			name: "Ivy",
			percentage: "0.75%",
			rank: 8,
		},
		{
			name: "Harvey",
			percentage: "0.15%",
			rank: 9,
		},
		{
			name: "Jonathan",
			percentage: "0.85%",
			rank: 10,
		},
	];

	return (
		<>
			<ScrollView>
				<View ml={3} mr={3}>
					{topTraders.traders ? (topTraders.traders.map((item, index) => (
						<HStack
							style={[styles.column, styles.tableLine]}
							alignItems={"center"}
                            key={index}
						>
							<HStack space={4} alignItems={"center"}>
								<Text style={styles.text}>{item.rank} </Text>
								<Image
									source={Profile}
									alt={"user-image"}
									style={styles.imageList}
								/>
								<Text style={styles.text}>{item.username}</Text>
							</HStack>
							<HStack justifyContent={"flex-end"} w={"60%"}>
								<Text style={styles.percentage}>
									{item.performance.toFixed(2)}%
								</Text>
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
	},

	button: {
		justifyContent: "center",
	},

	percentage: {
		borderRadius: 3,
		overflow: "hidden",
		paddingLeft: 4,
		marginRight: 4,
	},

	percentagePositive: {
		backgroundColor: "#31c451",
	},

	percentageNegative: {
		backgroundColor: "#ff6666",
	},
	laterals: {
		flexGrow: 1,
		alignItems: "center",
		h: 40,
		justifyContent: "flex-end",
		pb: 3,
	},
	central: {
		flexGrow: 2,
		alignItems: "center",
		h: 40,
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
		maargBottom: 3,
		marginTop: 4,
	},
});

export default LeaderboardHome;
