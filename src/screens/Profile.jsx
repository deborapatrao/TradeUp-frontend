import React, { useEffect } from 'react'
import {
    Box,
    Text,
    Button
} from "native-base";
import {
    getAuth,
    signInWithCustomToken,
  } from 'firebase/auth';

  import { useSelector, useDispatch } from "react-redux";
  import { loadUser } from "../redux/action";
// import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../redux/action";

const Profile = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(loadUser(token));
	}, [dispatch]);

    const logoutHandler = () => {
        dispatch(logout());
    }



      console.log("User", user)
      console.log("Token", token)
    return (
        <Box safeArea>
            <Text>{user ? user.email : "N/A"}</Text>
            <Button mt="2" colorScheme="primary" onPress={logoutHandler}>
				Logout
			</Button>
        </Box>
    );
};

export default Profile;
