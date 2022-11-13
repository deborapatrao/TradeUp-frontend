import {
	Heading,
	ScrollView,
	Text,
	View,
	HStack,
	Pressable,
	Image,
    Box,
    Center
} from "native-base";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import HomeHeader from "../../components/layout/HomeHeader";
import CoinListHeader from "../../components/layout/CoinListHeader";
import { getTrendingCoinsData } from "../../utils/requests";
import { cryptoImages } from "../../components/utils/assets";
import TopTradersContainer from "../../components/containers/home/TopTradersContainer";

import MarketIconInactive from "../../assets/images/bottom-tabs-icons/inactive/market.png";
import ResourceIconInactive from "../../assets/images/bottom-tabs-icons/inactive/resource.png";
import WalletIconInactive from "../../assets/images/bottom-tabs-icons/inactive/wallet.png";
import HomeIconActive from "../../assets/images/bottom-tabs-icons/active/home.png";

const HomeTour = ({ navigation }) => {
	const [data, setData] = useState([]);
	const [toggle, setToggle] = useState(false);
	const [type, setType] = useState("standard");

	useEffect(() => {
		loadTrendingCoins();
	}, [type, toggle]);

	const loadTrendingCoins = async () => {
		try {
			const data = await getTrendingCoinsData("/crypto/trending");

			let sortedData = [];

			switch (type) {
				case "24":
					sortedData = data.listSortedCoins.sort((a, b) => {
						return toggle
							? a.priceChangePercent - b.priceChangePercent
							: b.priceChangePercent - a.priceChangePercent;
					});

					break;
				case "alphabetical":
					sortedData = data.listSortedCoins.sort((a, b) => {
						return toggle
							? a.symbol.localeCompare(b.symbol)
							: b.symbol.localeCompare(a.symbol);
					});
					break;
				default:
					sortedData = data.listSortedCoins;
			}

			setData([...sortedData]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleTypeChange = (selectedType) => {
		setType(selectedType);
		setToggle(!toggle);
	};

	console.log(data);
	return (
		<>
			<HomeHeader />
			<ScrollView>
                <View>
				<Heading>Trending Coins</Heading>
				<CoinListHeader handleTypeChange={handleTypeChange} />

				{data.map((coin) => {
					const assetImage = cryptoImages.find(
						(imgItem) => imgItem.ticker === coin.symbol
					).image;

					return (
						<HStack
							onPress
							style={[styles.column, styles.tableLine]}
							alignItems={"center"}
                            key={coin.symbol}
						>
							<HStack space={4} alignItems={"center"}>
								<Image
									source={assetImage}
									alt={coin.symbol}
									style={{ width: 30, height: 30 }}
								/>
								<Text style={styles.text}>
									{coin.symbol.slice(0, -4)}{" "}
								</Text>
							</HStack>
							<HStack justifyContent={"space-between"} w={"60%"}>
								<Text style={styles.text}>
									{parseFloat(coin.lastPrice).toFixed(4)}{" "}
								</Text>
								<Text
									style={[
										styles.text,
										styles.percentage,
										coin.priceChangePercent >= 0
											? styles.percentagePositive
											: styles.percentageNegative,
									]}
								>
									{Number.parseFloat(
										coin.priceChangePercent
									).toFixed(2)}{" "}
									%
								</Text>
							</HStack>
						</HStack>
					);
				})}
                </View>

                <View>
                    <TopTradersContainer />
                </View>
			</ScrollView>


			<Box>
				<HStack
					bg="#171122"
					alignItems="center"
					safeAreaBottom
					shadow={6}
				>
					<Pressable cursor="pointer" py="3" flex={1}>
						<Center>
							<Image
								source={HomeIconActive}
								alt="Alternate Text"
                                mb={1}
							/>
							<Text color="#F2F2F2" fontSize="12">
								Home
							</Text>
						</Center>
					</Pressable>
					<Pressable cursor="pointer" py="2" flex={1}>
						<Center>
							<Image
								source={MarketIconInactive}
								alt="Alternate Text"
                                mb={1}
							/>
							<Text color="#7F7F7F" fontSize="12">
								Market
							</Text>
						</Center>
					</Pressable>
					<Pressable cursor="pointer" py="2" flex={1}>
						<Center>
							<Image
								source={ResourceIconInactive}
								alt="Alternate Text"
                                mb={1}
							/>
							<Text color="#7F7F7F" fontSize="12">
								Resources
							</Text>
						</Center>
					</Pressable>
					<Pressable cursor="pointer" py="2" flex={1}>
						<Center>
							<Image
								source={WalletIconInactive}
								alt="Alternate Text"
                                mb={1}
							/>
							<Text color="#7F7F7F" fontSize="12">
								Wallet
							</Text>
						</Center>
					</Pressable>
				</HStack>
			</Box>
		</>
	);
};

const styles = StyleSheet.create({
	column: {
		justifyContent: "space-between",
		marginBottom: 5,
		marginTop: 5,
		textAlign: "center",
	},

	tableLine: {
		backgroundColor: "rgba(204, 204, 204, .1)",
		padding: 15,
		borderRadius: 5,
	},

	text: {
		color: "#fff",
	},

	percentage: {
		borderRadius: 3,
		overflow: "hidden",
		paddingLeft: 4,
		paddingRight: 4,
		height: 22,
	},

	percentagePositive: {
		backgroundColor: "#31c451",
	},

	percentageNegative: {
		backgroundColor: "#ff6666",
	},
});

export default HomeTour;
