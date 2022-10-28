import { useEffect, useState } from "react";
import { Box, Text, FlatList, Center } from "native-base";
import { StyleSheet } from "react-native";
import { getTradeHistoryData } from "../../utils/requests";
import HistoryItem from "../../components/listItems/HistoryItem";

const TradesScreen = () => {
	const [tradeHistoryData, setTradeHistoryData] = useState();

	useEffect(() => {
		loadTradeHistory();
	}, []);

	const loadTradeHistory = async () => {
		const data = await getTradeHistoryData("/wallet/history");
		setTradeHistoryData(data.tradeInfo);
	};

	return (
		<>
			{tradeHistoryData.length > 0 ? (
				<FlatList
					data={tradeHistoryData}
					style={{ paddingHorizontal: 5 }}
					renderItem={({ item }) => {
						return <HistoryItem history={item} />;
					}}
				/>
			) : (
				<Center style={styles.container}><Text>No data available</Text></Center>
			)}
		</>
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
