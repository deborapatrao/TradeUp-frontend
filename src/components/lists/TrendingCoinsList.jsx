import React, { useState, useEffect } from "react";
import { FlatList, Heading } from "native-base";
import { StyleSheet } from "react-native";
import CryptoItem from "../listItems/CryptoItem";
import { getTrendingCoinsData } from "../../utils/requests";
import { useNavigation } from "@react-navigation/native";
import CoinListHeader from "../layout/CoinListHeader";
import TopTradersContainer from "../containers/home/TopTradersContainer";
import {
	TourGuideZone, // Main wrapper of highlight component
	TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
	useTourGuideController, // hook to start, etc.
} from "rn-tourguide";

const TrendingCoinsList = () => {
	const navigation = useNavigation();

	const [data, setData] = useState([]);
	const [toggle, setToggle] = useState(false);
	const [type, setType] = useState("standard");

	useEffect(() => {
		// console.log("useeffect triggered")
		// const checkedFocus = navigation.addListener("focus", async () => {
		loadTrendingCoins();
		// 	console.log("TrendingCoinsList focused");
		// });

		// return checkedFocus;
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

	// Use Hooks to control!
	const {
		canStart, // a boolean indicate if you can start tour guide
		start, // a function to start the tourguide
		stop, // a function  to stopping it
		eventEmitter, // an object for listening some events
	} = useTourGuideController();

	// Can start at mount 🎉
	// you need to wait until everything is registered 😁
	useEffect(() => {
		canStart && start();
	}, [canStart,]);

	const handleOnStart = () => console.log("start");
	const handleOnStop = () => console.log("stop");
	const handleOnStepChange = () => console.log(`stepChange`);

	// Listen to some events
	useEffect(() => {
		eventEmitter.on("start", handleOnStart);
		eventEmitter.on("stop", handleOnStop);
		eventEmitter.on("stepChange", handleOnStepChange);

		return () => {
			eventEmitter.off("start", handleOnStart);
			eventEmitter.off("stop", handleOnStop);
			eventEmitter.off("stepChange", handleOnStepChange);
		};
	}, []);

	return (
		<>
			<TourGuideZone
				zone={1}
				text={"Find coins with the most movement in price."}
				borderRadius={0}
				keepTooltipPosition={true}
				// shape={"rectangle"}
				top={0}
			>
				<FlatList
					ListHeaderComponent={() => (
						<>
							<Heading>Trending Coins</Heading>
							<CoinListHeader
								handleTypeChange={handleTypeChange}
							/>
						</>
					)}
					data={data}
					style={{ paddingHorizontal: 5 }}
					renderItem={({ item }) => {
						return (
							<CryptoItem navigation={navigation} coin={item} />
						);
					}}
					keyExtractor={(item) => item.symbol}
					ListFooterComponent={() => (
						<>
							<TopTradersContainer />
						</>
					)}
				/>
			</TourGuideZone>
			{/* <TourGuideZoneByPosition
				zone={2}
				text={"To see the list of coins to buy or sell, go to Market."}
				shape={"circle"}
				isTourGuide
				bottom={-65}
				left={130}
				width={60}
				height={60}
			/> */}
			
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
