import React, { useState, useEffect } from "react";
import {
	Box,
	VStack,
	Center,
	Text,
	HStack,
	Divider,
	FlatList,
	Button,
	NativeBaseProvider,
	Heading,
	Stack,
	View,
	Row,
} from "native-base";
import { StyleSheet } from "react-native";
import CryptoItem from "../listItems/CryptoItem";
import { getTrendingCoinsData } from "../../utils/requests";
import { useNavigation } from "@react-navigation/native";
import CoinListHeader from "../layout/CoinListHeader";
import TopTradersContainer from "../containers/home/TopTradersContainer";

const axios = require("axios");

const TrendingCoinsList = () => {
	const navigation = useNavigation();

	const [data, setData] = useState([]);
	const [toggle, setToggle] = useState(false);
	const [type, setType] = useState("standard");

	useEffect(() => {
		const checkedFocus = navigation.addListener("focus", async () => {
			await loadCoins();
			console.log("TrendingCoinsList focused");
		});

		return checkedFocus;
	}, [type, toggle]);

	const loadCoins = async () => {
		try {
			const data = await getTrendingCoinsData("/crypto/trending");

			console.log(data);
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
					sortedData = data.sort((a, b) => {
						return toggle
							? a.symbol.localeCompare(b.symbol)
							: b.symbol.localeCompare(a.symbol);
					});
					break;
				default:
					sortedData = data.listSortedCoins;
			}

			setData([...sortedData]);

			setData(data.listSortedCoins);
		} catch (error) {
			console.log(error);
		}
	};

	const handleTypeChange = (selectedType) => {
		setType(selectedType);
		setToggle(!toggle);
	};

	return (
		<>
			<FlatList
                ListHeaderComponent={() => <><Heading>Trending Coins</Heading><CoinListHeader handleTypeChange={handleTypeChange} /></>}
				data={data}
				style={{ paddingHorizontal: 5 }}
				renderItem={({ item }) => {
					return <CryptoItem navigation={navigation} coin={item} />;
				}}
				keyExtractor={(item) => item.symbol}
                ListFooterComponent={() => <><TopTradersContainer /></>}
			/>
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

	button: {
		justifyContent: "center",
	},

	percentage: {
		borderRadius: 3,
		overflow: "hidden",
		paddingLeft: 4,
		paddingRight: 4,
	},

	percentagePositive: {
		backgroundColor: "#31c451",
	},

	percentageNegative: {
		backgroundColor: "#ff6666",
	},
});

export default TrendingCoinsList;
