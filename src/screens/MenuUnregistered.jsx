import React, { useEffect } from "react";
import { Box, Text, Button } from "native-base";

import { useSelector, useDispatch } from "react-redux";
// import { loadUser } from "../redux/action";

import { logout } from "../redux/action";

const MenuUnregistered = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<Box safeArea>
			<Text>Welcome</Text>
			<Button mt="2" colorScheme="primary" >
				Sign In
			</Button>
            <Text>Create Account</Text>
		</Box>
	);
};

export default MenuUnregistered;
