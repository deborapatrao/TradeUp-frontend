import React, { useEffect } from 'react'
import {
    Box,
    Text,
    Button
} from "native-base";
import { loadUser } from "../redux/action";
import { useDispatch, useSelector } from 'react-redux'


const Home = () => {

    const dispatch = useDispatch();
	const { user, token, isAuthenticated } = useSelector((state) => state.auth);

	useEffect(() => {
        if(!user && token && isAuthenticated) {
		dispatch(loadUser(token));
        }
	}, [dispatch, user]);

    return (
        <Box safeArea>
            <Text>Home</Text>
            <Text>Hi, {user ? user.email : "N/A"}</Text>
        </Box>
    );
};

export default Home;
