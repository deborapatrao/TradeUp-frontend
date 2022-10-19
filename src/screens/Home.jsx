import React, { useState, useEffect } from "react";
import { Box, Text, Button } from "native-base";
import { loadUser } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";

const Home = () => {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	const dispatch = useDispatch();
	const { user, token, isAuthenticated } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!user && token && isAuthenticated) {
			dispatch(loadUser(token));
		}
	}, [dispatch, user]);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	console.log("user location", location);

	return (
		<Box safeArea>
			<Text>Home</Text>
			<Text>Hi, {user ? user.email : "N/A"}</Text>
		</Box>
	);
};

export default Home;
