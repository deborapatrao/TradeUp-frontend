import React, { useEffect, useState } from 'react'
import { Text, Button, Center, Box } from "native-base";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { skipTutorial } from "../redux/action";

const Profile = ({ navigation }) => {

    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

	const resetHandler = () => {
		dispatch(skipTutorial(user.firebase_uuid, true));
	}

	const resetDisabled = () => {
	}

	return (
		<>
			<Center w="100%">
				<Box px="6" w="100%">
					<Button
						mt="10"
						style={loading || user.isTutorial ? styles.buttonLoading : styles.button}
						onPress={loading || user.isTutorial ? resetDisabled : resetHandler}
					>
						<Text style={styles.btnText}>{loading ? "Loading..." : "Reset Tutorial"}</Text>
					</Button>
				</Box>
			</Center>
		</>
	);
};

export default Profile;

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#386AF5",
		borderRadius: 5,
		width: "100%",
	},
	buttonLoading: {
		backgroundColor: "#7F7F7F",
	},
	btnText: {
		fontSize: 16,
		fontWeight: "500",
	},
});