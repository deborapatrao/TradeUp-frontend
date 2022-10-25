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
                <Button mt="2" variant="link" colorScheme="primary" onPress={logoutHandler}>
                    Logout
                </Button>
			</Center>
		</Box>
	);
};

export default Menu;
