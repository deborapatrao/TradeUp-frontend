import React, { useEffect } from "react";
import { Image, Heading, Text, Center, Avatar } from "native-base";
import Logo from "../../src/assets/images/menu-logo.png";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
// import { loadUser } from "../redux/action";

import { logout } from "../redux/action";

const MenuRegistered = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	return (
		<Center>
			{/* <Image
				source={{
					uri: "https://firebasestorage.googleapis.com/v0/b/trade-up-bc1be.appspot.com/o/user_placeholder.jpg?alt=media&token",
				}}
				alt={user ? user.username : "Avatar"}
				style={styles.image}
			/> */}
			<Avatar
				alignSelf="center"
				size="xl"
				source={{
					uri: user.picture ? user.picture : "https://firebasestorage.googleapis.com/v0/b/trade-up-bc1be.appspot.com/o/user_placeholder.jpg?alt=media&token=f4a15f20-ca35-449f-bf12-394e246d8be2",
				}}
				my={4}
			>
				{user ? user.username : "N/A"}
			</Avatar>
			<Text style={styles.username}>{user ? user.username : "N/A"}</Text>
		</Center>
	);
};

export default MenuRegistered;

const styles = StyleSheet.create({
	username: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 20
	},
	image: {
		width: 150,
		height: 150,
		resizeMode: "contain",
		borderRadius: 100,
	},
});
