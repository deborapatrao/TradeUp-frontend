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

const MenuUnregistered = ({ navigation }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	return (
		<Box>
			<Center>
				<Image source={Logo} alt="Alternate Text" />
				<Heading>Welcome</Heading>
				<Button mt="2" style={{ width: "100%" }}>
					Sign In
				</Button>
				<Text>Create Account</Text>
			</Center>

			<MenuList navigation={navigation} />

			<Center>
				<Button mt="2" variant="link">
					Logout
				</Button>
			</Center>
		</Box>
	);
};

export default MenuUnregistered;
