import React, { useEffect } from "react";
import {
	Box,
	Text,
	Button,
	Heading,
	Center,
	Image,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../src/assets/images/menu-logo.png";
import { logout } from "../redux/action"
import MenuList from "../components/lists/MenuList";
import MenuRegistered from "./MenuRegistered";
import MenuUnregistered from "./MenuUnregistered";
import { StyleSheet, TouchableOpacity } from "react-native";

const Menu = ({ navigation }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

    const logoutHandler = () => {
		user ? dispatch(logout()) : ""
	};

	return (
		<Box>
            { user ? <MenuRegistered navigation={navigation} /> : <MenuUnregistered navigation={navigation} /> }

			<MenuList navigation={navigation} />

			<Center>
				<TouchableOpacity style={styles.logout} onPress={logoutHandler}>
					<Text style={styles.logoutText}>Log Out</Text>
				</TouchableOpacity>
			</Center>
		</Box>
	);
};

export default Menu;

const styles = StyleSheet.create({
	logout: {
		marginTop: 25,
	},
	logoutText: {
		fontSize: 18,
		color: "#7F7F7F",
	},
});