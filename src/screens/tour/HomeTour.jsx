import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Switch,
	ScrollView,
} from "react-native";
import {
	Heading,
	Text,
	HStack,
	Pressable,
	Image,
	Box,
	Center,
    Divider,
	Button
} from "native-base";
import HomeHeader from "../../components/layout/HomeHeader";
import TopTradersContainer from "../../components/containers/home/TopTradersContainer";
import CoinListHeader from "../../components/layout/CoinListHeader";
import { getTrendingCoinsData } from "../../utils/requests";
import { cryptoImages } from "../../components/utils/assets";
import TourTooltip from "../../components/utils/TourTooltip";
import MarketIconInactive from "../../assets/images/bottom-tabs-icons/inactive/market.png";
import ResourceIconInactive from "../../assets/images/bottom-tabs-icons/inactive/resource.png";
import WalletIconInactive from "../../assets/images/bottom-tabs-icons/inactive/wallet.png";
import HomeIconActive from "../../assets/images/bottom-tabs-icons/active/home.png";
import { useNavigation } from "@react-navigation/native";
import Leaderboard from "../leaderboard/Leaderboard";
import LeaderboardHome from "../leaderboard/LeaderboardHome";

import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
import Carousel from "../resources/Carousel";

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);
const WalkthroughableView = walkthroughable(View);
const WalkthroughableScrollView = walkthroughable(ScrollView);

function HomeTour({ navigation, start, stop, copilotEvents, setCanTour, setGoToMarket }) {
	// navigation.navigate("Market", "CryptoList");
	const refScrollView = useRef();

	const [secondStepActive, setSecondStepActive] = useState(true);
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

	useEffect(() => {
		const tourTimeout = setTimeout(() => {
			start(false, refScrollView.current);
		}, 300);

		copilotEvents.on("stepChange", (step) => {
			// console.log(`Step is ${step.name}`)
			// console.log(step.name)
			if(step.name == "step3"){
				copilotEvents.on("stop", () => {
					setGoToMarket(true)
				});
			} else {
				copilotEvents.on("stop", () => {
					setCanTour(false)
				});
			}
		});

		copilotEvents.on("stop", () => {
			// setCanTour(false)
		});


		return () => {
			clearTimeout(tourTimeout);
			copilotEvents.off("stepChange");
			copilotEvents.off("stop");
		};
	}, []);

	return (
		<>
			{/* <HomeHeader /> */}
			<ScrollView ref={refScrollView}>
			<Carousel />
				<CopilotStep
					text="Find coins with the most movement in price."
					order={1}
					name="step1"
				>
					<WalkthroughableView>
						<View>
							<Heading>Trending Coins</Heading>
							<CoinListHeader
								handleTypeChange={handleTypeChange}
							/>

							{data.map((coin) => {
								const assetImage = cryptoImages.find(
									(imgItem) => imgItem.ticker === coin.symbol
								).image;

								return (
									<HStack
										onPress
										style={[
											styles.column,
											styles.tableLine,
										]}
										alignItems={"center"}
										key={coin.symbol}
									>
										<HStack space={4} alignItems={"center"}>
											<Image
												source={assetImage}
												alt={coin.symbol}
												style={{
													width: 30,
													height: 30,
												}}
											/>
											<Text style={styles.text}>
												{coin.symbol.slice(0, -4)}{" "}
											</Text>
										</HStack>
										<HStack
											justifyContent={"space-between"}
											w={"60%"}
										>
											<Text style={styles.text}>
												{parseFloat(
													coin.lastPrice
												).toFixed(4)}{" "}
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
					</WalkthroughableView>
				</CopilotStep>

                <Divider my={6} />

				<View>
					<CopilotStep
						text="Become a top trader based on consistent learning."
						order={2}
						name="step2"
					>
						<WalkthroughableView>
							<View>
							<TopTradersContainer />
							</View>
						</WalkthroughableView>
					</CopilotStep>
				</View>
			</ScrollView>

			<View>
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
							<CopilotStep
								text="To see the list of coins to buy or sell, go to Market."
								order={3}
								name="step3"
								navigation={navigation}
								setCanTour={setCanTour}
							>
								<WalkthroughableView>
									<View>
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
									</View>
								</WalkthroughableView>
							</CopilotStep>
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
			</View>
		</>
	);
}

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

HomeTour.propTypes = {
	start: PropTypes.func.isRequired,
	copilotEvents: PropTypes.shape({
		on: PropTypes.func.isRequired,
	}).isRequired,
};

const style = {
	backgroundColor: "#386AF5",
	color: "#fff",
};


export default copilot({
	verticalOffset: 5,
	tooltipComponent: TourTooltip,
	arrowColor: '#386AF5',
	tooltipStyle: style,
	backdropColor: "rgba(23, 17, 34, 0.95)",
	animated: true, // Can be true or false
	overlay: "svg", // Can be either view or svg
	stepNumberComponent: () => (<></>),
})(HomeTour);
