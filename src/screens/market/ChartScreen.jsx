import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
	Box,
	Button,
	VStack,
	Text,
	HStack,
	Divider,
	// ScrollView,
	Heading,
	Stack,
} from "native-base";
import { StyleSheet, ScrollView, View } from "react-native";
import PriceStatic from "../../components/containers/market/PriceStatic";
import ChartComponent from "../../components/containers/market/chart";
import { useSelector, useDispatch } from "react-redux";

import TourTooltip from "../../components/utils/TourTooltip";
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableView = walkthroughable(View);
const WalkthroughableButton = walkthroughable(Button);
const WalkthroughableScrollView = walkthroughable(ScrollView);

const ChartScreen = ({ navigation, route, start, copilotEvents }) => {
	const refScrollView = useRef();

	const { ticker } = route.params;

	// const dispatch = useDispatch();
	// const { user } = useSelector((state) => state.auth);
	// console.log(user);
	const [dataBids, setDataBids] = useState([]);
	const [dataAsks, setDataAsks] = useState([]);
	const [dataCoin, setDataCoin] = useState([]);
	const [loading, setLoading] = useState(true);

	const url = `https://api.binance.com/api/v3/depth?symbol=${ticker}&limit=10`;
	const url24 = `https://api.binance.com/api/v3/ticker/24hr?symbol=${ticker}`;

	useEffect(() => {
		loadOrders();
		loadOverview();
		const intervalId = setInterval(() => {
			loadOrders();
			loadOverview();
		}, 5000);
		return () => clearInterval(intervalId);
	}, []);

	function loadOrders() {
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				// console.log(json.bids);
				setDataBids(json.bids);
				setDataAsks(json.asks);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}
	function loadOverview() {
		fetch(url24)
			.then((response) => response.json())
			.then((json) => {
				setDataCoin(json);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}

	useEffect(() => {
		const tourTimeout = setTimeout(() => {
			start(false, refScrollView.current);
		}, 300);

		copilotEvents.on("stepChange", (step) => {
			console.log(`Step is ${step.name}`);
		});

		copilotEvents.on("stop", () => {
			// setCanTour(false)
			// navigation.navigate("Market", "CryptoList");
		});

		return () => {
			clearTimeout(tourTimeout);
			copilotEvents.off("stepChange");
			copilotEvents.off("stop");
		};
	}, []);

	return (
		<>
			<ScrollView bg={"red"} ref={refScrollView}>
				<VStack w="100%" backgroundColor="#171122" pt={2}>
					<Box>
						{/* <Box m={2}>
                  {dataCoin.priceChangePercent > 0 ? 
                    <Text>Price Per Unit <ChevronUpIcon style={{color:"#31c451", alignItems: 'center'}}/> {Math.floor(parseFloat(dataCoin.priceChangePercent) * 100) + '%'}</Text> : 
                    <Text>Price Per Unit <ChevronDownIcon style={{color:"#FF6666", alignItems: 'center'}}/> {Math.floor(parseFloat(dataCoin.priceChangePercent) * 100) + '%'}</Text> }
                    
                    <Text fontSize='4xl'>≈${parseFloat(dataCoin.prevClosePrice).toFixed(2)}</Text>
                  </Box>                 */}
						<PriceStatic ticker={ticker} />

						{/* CHART BOX */}
						<Box>
							{/* <ChartContainer navigation={navigation} /> */}
							<ScrollView bg={"primary.bg"} paddingX={4}>
								<Box>
									<CopilotStep
										text="Toggle to change the time interval of each candle stick."
										order={1}
										name="cryptostep1"
									>
										<WalkthroughableView>
											<Box>
												<ChartComponent
													ticker={ticker}
												/>
											</Box>
										</WalkthroughableView>
									</CopilotStep>
								</Box>
							</ScrollView>
							{/* <Box style={styles.container}> */}
							<ScrollView>
								<VStack space="2" m="1" px="2" width="auto">
									<Heading size="md">Overview</Heading>
									<Stack
										direction="row"
										mb="2"
										mt="1"
										justifyContent={"space-between"}
									>
										<Box width={"49%"}>
											<HStack justifyContent="space-between">
												<Text fontSize={"xs"}>
													High
												</Text>
												<Text
													fontSize={"xs"}
													color="#31c451"
												>
													{parseFloat(
														dataCoin.highPrice
													).toFixed(2)}
												</Text>
											</HStack>
											<HStack justifyContent="space-between">
												<Text fontSize={"xs"}>Low</Text>
												<Text
													fontSize={"xs"}
													color="#FF6666"
												>
													{parseFloat(
														dataCoin.lowPrice
													).toFixed(2)}
												</Text>
											</HStack>
											<HStack justifyContent="space-between">
												<Text fontSize={"xs"}>
													Open
												</Text>
												<Text fontSize={"xs"}>
													{parseFloat(
														dataCoin.openPrice
													).toFixed(2)}
												</Text>
											</HStack>
										</Box>
										<Box width={"49%"}>
											<HStack justifyContent="space-between">
												<Text fontSize={"xs"}>
													Mkt Cap
												</Text>
												<Text fontSize={"xs"}>-</Text>
											</HStack>
											<HStack justifyContent="space-between">
												<Text fontSize={"xs"}>
													Vol 24h
												</Text>
												<Text fontSize={"xs"}>
													{parseFloat(
														dataCoin.volume
													).toFixed(2)}
												</Text>
											</HStack>
											<HStack justifyContent="space-between">
												<Text fontSize={"xs"}>
													Mkt Dominance
												</Text>
												<Text fontSize={"xs"}>-</Text>
											</HStack>
										</Box>
									</Stack>
								</VStack>
							</ScrollView>
						</Box>
						<Divider mt={5} mb={2} />
						<CopilotStep
							text="The order book shows all outstanding orders of users."
							order={2}
							name="cryptostep2"
						>
							<WalkthroughableView>
								<View>
									<Box>
										<Heading size="sm" m={2}>
											Order Book
										</Heading>
										<Stack
											direction="row"
											mb="0"
											mt="0"
											mr={1}
											ml={1}
											justifyContent={"space-between"}
										>
											<Box flexBasis={"49%"}>
												<Text textAlign={"center"}>
													Bid
												</Text>
												<HStack
													mb="2"
													mt="1"
													justifyContent={
														"space-between"
													}
												>
													<Text>Price (USDT)</Text>
													<Text>Amount</Text>
												</HStack>
											</Box>

											<Box flexBasis={"49%"}>
												<Text textAlign={"center"}>
													Ask
												</Text>
												<HStack
													mb="1"
													mt="1"
													justifyContent={
														"space-between"
													}
												>
													<Text>Price (USDT)</Text>
													<Text>Amount</Text>
												</HStack>
											</Box>
										</Stack>
										<Divider />
									</Box>
									<Box style={styles.container}>
										{loading ? (
											<Text>Loading ...</Text>
										) : (
											<>
												<Box width={"50%"}>
													<CopilotStep
														text="Green refers to quantity and price they are buying for."
														order={3}
														name="cryptostep3"
													>
														<WalkthroughableView>
															{dataBids.map(
																(
																	bids,
																	index
																) => (
																	<>
																		<VStack key={index}>
																			{index ==
																				0 ? (
																				
																				<>
																					<CopilotStep
																						text="So, the top refers to the best price for you to sell a coin"
																						order={4}
																						name="cryptostep4"
																						
																					>
																						<WalkthroughableView>
																							<HStack style={styles.rowSpacer}>
																								<Text fontSize={"sm"} color="#31c451" ml={2}>
																									{parseFloat(
																										bids[0]
																									).toFixed(
																										4
																									)}
																								</Text>

																								<Text fontSize={"sm"} color="#31c451">
																									{parseFloat(
																										bids[1]
																									).toFixed(
																										4
																									)}
																								</Text>
																							</HStack>
																						</WalkthroughableView>
																					</CopilotStep>
																				</>
																			) : (
																				<>
																					<HStack style={styles.rowSpacer}>
																						<Text
																							fontSize={"sm"}
																							color="#31c451"
																							ml={2}
																						>
																							{parseFloat(
																								bids[0]
																							).toFixed(
																								4
																							)}
																						</Text>
																						<Text
																							fontSize={"sm"}
																							color="#31c451"
																						>
																							{parseFloat(
																								bids[1]
																							).toFixed(
																								4
																							)}
																						</Text>
																					</HStack>
																				</>
																			)}

																		</VStack>
																	</>
																)
															)}
														</WalkthroughableView>
													</CopilotStep>
												</Box>

												<Box width={"50%"}>

													<CopilotStep
														text="Red refers to quantity and price they are selling for."
														order={5}
														name="cryptostep5"
													>
														<WalkthroughableView>
															{dataAsks.map(
																(asks, index) => (
																	<>
																		<VStack key={index}>
																			{index == 0 ? (
																				<>
																					<CopilotStep
																						text="So, the top refers to the best price for you to buy a coin"
																						order={6}
																						name="cryptostep6"
																					>
																						<WalkthroughableView>
																							<HStack style={styles.rowSpacer}>
																								<Text fontSize={"sm"} color="#FF6666" ml={2}>
																									{parseFloat(
																										asks[0]
																									).toFixed(
																										4
																									)}
																								</Text>

																								<Text fontSize={"sm"} color="#FF6666">
																									{parseFloat(
																										asks[1]
																									).toFixed(
																										4
																									)}
																								</Text>
																							</HStack>
																						</WalkthroughableView>
																					</CopilotStep>
																				</>
																			) : (
																				<>
																					<HStack style={styles.rowSpacer}>
																						<Text
																							fontSize={"sm"}
																							color="#FF6666"
																							ml={2}
																						>
																							{parseFloat(
																								asks[0]
																							).toFixed(
																								4
																							)}
																						</Text>
																						<Text
																							fontSize={"sm"}
																							color="#FF6666"
																						>
																							{parseFloat(
																								asks[1]
																							).toFixed(
																								4
																							)}
																						</Text>
																					</HStack>
																				</>
																			)}

																		</VStack>
																	</>
																)
															)}
														</WalkthroughableView>
													</CopilotStep>
												</Box>
											</>
										)}
									</Box>
								</View>
							</WalkthroughableView>
						</CopilotStep>
					</Box>
				</VStack>
				<Box>
					<HStack justifyContent={"space-between"} mt={5}>
						<CopilotStep
							text="Select this to buy your first coin!"
							order={7}
							name="cryptostep7"
						>
							<WalkthroughableView>
								<View>
									<Button
										w={"98%"}
										alignSelf={"flex-start"}
										onPress={() =>
											navigation.navigate("BuyAndSell", {
												ticker: ticker,
											})
										}
									>
										Buy
									</Button>
								</View>
							</WalkthroughableView>
						</CopilotStep>

						<Button
							w={"49%"}
							backgroundColor={"secondary.red"}
							alignSelf={"flex-start"}
							onPress={() =>
								navigation.navigate("BuyAndSell", {
									ticker: ticker,
								})
							}
						>
							Sell
						</Button>
					</HStack>
				</Box>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		// m: 2,
	},
	text: {
		fontSize: 10,
	},
	rowSpacer: {
		flex: 2,
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

// export default ChartScreen;

ChartScreen.propTypes = {
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
	// verticalOffset: 25,
	tooltipComponent: TourTooltip,
	arrowColor: "#386AF5",
	tooltipStyle: style,
	backdropColor: "rgba(23, 17, 34, 0.95)",
	animated: true, // Can be true or false
	overlay: "svg", // Can be either view or svg
	stepNumberComponent: () => <></>,
})(ChartScreen);
