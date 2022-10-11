import React, { useEffect } from 'react'
import {
    Box,
    Text,
    Button
} from "native-base";

// import { useDispatch, useSelector } from 'react-redux'
// import { logout } from "../redux/action";

const Profile = () => {
    const logoutHandler = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    };

    return (
        <Box safeArea>
            <Button mt="2" colorScheme="primary" onPress={logoutHandler}>
				Logout
			</Button>
        </Box>
    );
};

export default Profile;
