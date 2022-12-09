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
	Center,
	Box,
} from "native-base";
import Down from "../../assets/images/icons/down.png";
import Up from "../../assets/images/icons/up.png";
import Profile from "../../assets/images/icons/profile.png";
import { StyleSheet, ScrollView } from "react-native";
import Loader from "../../components/utils/Loader";
import { getTopTraders } from "../../utils/requests";
import { useSelector } from "react-redux";
import { ordinalFormatter } from "../../components/utils/numberFormats";

const Leaderboard = ({ navigation }) => {


	const { user } = useSelector((state) => state.auth);
	const [top3, setTop3] = useState([]);
	const [topTraders, setTopTraders] = useState([]);
	const [userRank, setUserRank] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		loadTopTraders();
	}, []);

	// useEffect(() => {
	// 	const checkedFocus = navigation.addListener("focus", async () => {
	// 		await loadTopTraders();
	// 		// console.log("Leaderboard focused");
	// 	});

	// 	return checkedFocus;
	// }, [navigation]);


	const swapElements = (arr) => {
		var temp = arr[1]
		arr[1] = arr[0]
		arr[0] = temp

		return arr
	}

	const loadTopTraders = async () => {
		try {
			const data = await getTopTraders(
				"/leaderboard",
				user.location.city
			);

			console.log("top3", data)
			setUserRank(data.rank);

			if (data.traders.length < 3) {
				setTopTraders(data.traders);
			} else {
				var first3 = data.traders.slice(0, 3)
				first3 = swapElements(first3)
				setTop3(first3)
				const traders = data.traders.slice(3, data.traders.length)
				setTopTraders(traders);
			}

		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{topTraders != 0 ?
				<>
					{/* <Box style={[styles.trapezoid]}> */}
					<HStack style={styles.leaders}>

						{top3.map((item, index) => (
							<VStack style={index == 1 ? styles.central : styles.laterals} key={index}>
								<View>
									<Image
										source={{ uri: item.picture ? item.picture : "https://firebasestorage.googleapis.com/v0/b/trade-up-bc1be.appspot.com/o/user_placeholder.jpg?alt=media&token=f4a15f20-ca35-449f-bf12-394e246d8be2", }}
										alt={"user-image"}
										style={index == 1 ? styles.imageCentral : styles.imageLaterals}
									/>
									<View
										style={index == 1 ? styles.viewContainerCentral : styles.viewContainerLateral}
										backgroundColor={index == 0 ? "#A7A7AD" : "#A77044"}
									>
										<Text style={styles.leads}>{item.rank}</Text>
									</View>
								</View>
								<Text>{item.username}</Text>
								<HStack>
									{item.performance > 0 ?
										<Image source={Up} style={styles.positivePercentage} alt="up" /> :
										<Image source={Down} style={styles.negativePercentage} alt="down" />}
									<Text style={styles.percentage}>
										{item.performance.toFixed(2)}%
									</Text>
								</HStack>
							</VStack>
						))}
					</HStack>
					{/* </Box> */}
					<ScrollView>
						<View ml={3} mr={3}>
							<HStack style={styles.rank}>
								<Text fontSize={'xl'} fontWeight={"bold"}>Your Rank: {userRank !== 0 ? ordinalFormatter(userRank) : "Not Ranked"}</Text>
							</HStack>

							{topTraders.map((item, index) => (
								<HStack
									style={[styles.column, styles.tableLine]}
									alignItems={"center"}
									key={index}
								>
									<HStack space={2} alignItems={"center"}>
										<Text style={styles.text}>{item.rank} </Text>
										<Image
											source={{ uri: item.picture ? item.picture : "https://firebasestorage.googleapis.com/v0/b/trade-up-bc1be.appspot.com/o/user_placeholder.jpg?alt=media&token=f4a15f20-ca35-449f-bf12-394e246d8be2", }}
											alt={"user-image"}
											style={styles.imageList}
										/>
										<Text style={styles.text}>{item.username} </Text>
									</HStack>
									<HStack justifyContent={"flex-end"} w={"50%"}>
										<HStack justifyContent={"flex-start"} space={2}>
											{item.performance > 0 ?
												<Image source={Up} style={styles.positivePercentage} alt="up" /> :
												<Image source={Down} style={styles.negativePercentage} alt="down" />}
											<Text style={styles.percentage}>
												{item.performance.toFixed(2)}%
											</Text>
										</HStack>
									</HStack>
								</HStack>
							))}

						</View>
					</ScrollView>
				</>
				:
				<Box style={styles.loader}>
					<Loader />
				</Box>
			}
		</>
	);
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: "#171122",
	},
	rank: {
		marginBottom: 25,
		marginTop: 40,
	},
	loader: {
		justifyContent: "center",
		height: "100%",
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
		marginRight: 6,
		marginLeft: 6,
		fontWeight: "bold",
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
		borderRadius: 60,
	},
	leaders: {
		justifyContent: "space-between",
		marginLeft: 3,
		marginRigh: 3,
		maargBottom: 3,
		marginTop: 15,
	},
	viewContainerLateral: {
		flexDirection: "row",
		position: "absolute",
		right: 0,
		top: 0,
		alignSelf: "center",
		padding: 0,
		borderRadius: 50,
		width: 23,
		height: 23,
	},

	viewContainerCentral: {
		flexDirection: "row",
		position: "absolute",
		right: 0,
		top: 10,
		alignSelf: "center",
		padding: 0,
		borderRadius: 50,
		width: 23,
		height: 23,
		backgroundColor: "#D6AF36",
	},
	leads: {
		color: "black",
		width: "100%",
		fontWeight: "bold",
		textAlign: "center",
		padding: 0,
		margin: 0,
	},
});

export default Leaderboard;
