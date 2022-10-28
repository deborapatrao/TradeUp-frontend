import { useEffect, useState } from "react";
import { Box, Text, FlatList, Center } from "native-base";
import { StyleSheet } from "react-native";
import { getTradeHistoryData } from "../../utils/requests";
import HistoryItem from "../../components/listItems/HistoryItem";

const TradesScreen = ({ navigation }) => {
	const [tradeHistoryData, setTradeHistoryData] = useState([]);

	useEffect(() => {
        const checkedFocus = navigation.addListener('focus', async () => {
            // await loadTradeHistory();
            try {
                const data = await getTradeHistoryData("/wallet/history");
                setTradeHistoryData(data.tradeInfo);  
            } catch (error) {
                console.log(error);
            }
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
