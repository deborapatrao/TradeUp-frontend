import React from "react";
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

const CoinListHeader = ({handleTypeChange}) => {
	return (
		<>
			<HStack style={styles.column}>
				<Button
					style={styles.background}
					onPress={() => handleTypeChange("alphabetical")}
				>
					<Text style={styles.text}>Pair</Text>
					<Text style={styles.text}>USDT</Text>
				</Button>

				<Button style={styles.background}>
					<Text style={styles.text}>Last</Text>
					<Text style={styles.text}>price</Text>
				</Button>

				<Button
					style={styles.background}
					onPress={() => handleTypeChange("24")}
				>
					<Text
						style={{
							...styles.text,
							width: 60,
							textAlign: "center",
						}}
					>
						24H Change
					</Text>
				</Button>
			</HStack>

			<Divider />
		</>
	);
};

export default CoinListHeader;

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
