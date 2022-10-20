import React, { useEffect } from "react";
import { Box, Text, Button } from "native-base";

import { useSelector, useDispatch } from "react-redux";
// import { loadUser } from "../redux/action";

import { logout } from "../redux/action";

const MenuRegistered = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<Box safeArea>
			<Text>{user ? user.username : "N/A"}</Text>
			<Button mt="2" colorScheme="primary" onPress={logoutHandler}>
				Logout
			</Button>
		</Box>
	);
};

export default MenuRegistered;
