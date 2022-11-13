import React, { useState, useEffect } from "react";
import { loadUser } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWalletData } from "../utils/requests";
import TrendingCoinsList from "../components/lists/TrendingCoinsList";

const Home = ({ navigation }) => {
	const dispatch = useDispatch();
	const { user, token, isAuthenticated } = useSelector((state) => state.auth);

	// Check if user is authenticated and token is received from server then load user
	// useEffect(() => {
	// 	if (!user && token && isAuthenticated) {
	// 		dispatch(loadUser(token));

	// 		if (user) {
	// 			user.location.city
	// 				? setLocation(user.location.city)
	// 				: setLocation(null);
	// 		}
	// 	}
	// }, [dispatch, user]);

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

	// console.log("Token: ", token);
	// console.log("user: ", user);
	// console.log("isAuthenticated: ", isAuthenticated);

	return (
		<>
			<TrendingCoinsList />
		</>
	);
};

export default Home;
