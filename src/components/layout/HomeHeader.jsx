import { Center, Text, Link, HStack } from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HomeHeader = ({}) => {
	const navigation = useNavigation();

	return (
		<Center>
			<HStack space={2} alignItems="center">
				<Link
					_text={{
						color: "indigo.500",
						fontWeight: "medium",
						fontSize: "sm",
					}}
					onPress={() => navigation.navigate("Profile")}
				>
					Profile
				</Link>
				<Text>Header with icons and input here</Text>
			</HStack>
		</Center>
	);
};

export default HomeHeader;
