import { useEffect, useState } from "react";
import { Box, Text, FlatList, Center, View } from "native-base";
import { StyleSheet } from "react-native";
import { getTradeHistoryData } from "../../utils/requests";
import HistoryItem from "../../components/listItems/HistoryItem";

const TradesScreen = ({ navigation }) => {
	const [tradeHistoryData, setTradeHistoryData] = useState([]);

	useEffect(() => {
		const checkedFocus = navigation.addListener('focus', async () => {
			await loadTradeHistory();
			console.log('TradesScreen focused');
		});

		return checkedFocus;
	}, [navigation]);

	const loadTradeHistory = async () => {
		try {
			const data = await getTradeHistoryData("/wallet/history");
			setTradeHistoryData(data.tradeInfo);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
			{tradeHistoryData.length > 0 ? (
				<FlatList
					data={tradeHistoryData}
					renderItem={({ item }) => {
						return <HistoryItem history={item} />;
					}}
				/>
			) : (
				<Center style={styles.container}><Text>No data available</Text></Center>
			)}
		</View>
	);
};

export default TradesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		color: 'white',
		textAlign: 'center',
	}
});
