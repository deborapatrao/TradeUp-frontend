import React, { useState, useEffect } from "react";
import { loadUser } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWalletData } from "../utils/requests";
import TrendingCoinsList from "../components/lists/TrendingCoinsList";
import { Text, Button } from "native-base";

const Home = ({ navigation }) => {
	const dispatch = useDispatch();
	const { user, token, isAuthenticated } = useSelector((state) => state.auth);

	// Testing
	useEffect(() => {
		(async () => {
			// const token = await AsyncStorage.getAllKeys();
			const token = await AsyncStorage.getItem("userIdToken");
			const userToken = await AsyncStorage.getItem("userId");
			// await AsyncStorage.clear();
			// console.log("Token: ", token);
			// console.log("userId: ", userToken);
			const response = await getWalletData("/wallet/history");
		})();
	}, []);
	
	const goToMarket = () => {
		navigation.navigate("Market");
	}

	return (
		<>
			{/* <Button onPress={goToMarket}><Text>Test</Text></Button> */}
			<TrendingCoinsList />
		</>
	);
};

export default Home;
