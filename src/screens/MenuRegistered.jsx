import React, { useEffect } from "react";
import { Image, Heading, Text, Center } from "native-base";
import Logo from "../../src/assets/images/menu-logo.png";

import { useSelector, useDispatch } from "react-redux";
// import { loadUser } from "../redux/action";

import { logout } from "../redux/action";

const MenuRegistered = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	return (
		<Center>
			<Image source={Logo} alt="Alternate Text" />
			<Heading>{user ? user.fullName : "N/A"}</Heading>
			<Text>{user ? user.username : "N/A"}</Text>
		</Center>
	);
};

export default MenuRegistered;
