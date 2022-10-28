import React from "react";
import { Text, HStack, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { priceFormatter, dateFormatter } from "../utils/numberFormats";

const HistoryItem = ({ history }) => {
	return (
		<>
        <VStack style={[styles.container]} space={3}>
            <VStack>
                <HStack style={styles.rowSpacer}>
                    <Text style={styles.text}>{history.ticker.replace('USDT', '')} <Text color={'secondary.darkGray'}>USDT</Text></Text>
                    <Text style={styles.date}>{dateFormatter(history.createdAt)}</Text>
                </HStack>
            </VStack>

            <VStack>
                <Text color={'secondary.darkGray'}>{history.type}</Text>
            </VStack>

            <VStack>
                <HStack style={styles.rowSpacer}>
                    <Text>Price (USDT)</Text>
                    <Text>{priceFormatter(history.price)}</Text>
                </HStack>

            </VStack>

            <VStack>
                <HStack style={styles.rowSpacer}>
                    <Text>Quantity ({history.ticker.replace('USDT', '')})</Text>
                    <Text>{history.quantity}</Text>
                </HStack>
            </VStack>

            <VStack>
                <HStack style={styles.rowSpacer}>
                    <Text>Total (USDT)</Text>
                    <Text>{history.totalPrice}</Text>
                </HStack>
            </VStack>
        </VStack>
		</>
	);
};

export default HistoryItem;

const styles = StyleSheet.create({
	container: {
		marginBottom: 5,
		marginTop: 5,
		textAlign: "center",
		backgroundColor: "rgba(204, 204, 204, .1)",
		padding: 15,
		borderRadius: 5,
	},

    date: {
        fontSize: '12sp',
    },

	text: {
		color: "#fff",
        fontSize: '16sp',
	},

    rowSpacer: {
        flex:2,
        flexDirection:"row",
        justifyContent:'space-between'
    },
});
