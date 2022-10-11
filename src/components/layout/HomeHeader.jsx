import { Center, Text, IconButton, HStack } from "native-base";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HomeHeader = ({ }) => {
	const navigation = useNavigation()

	return (
		<Center>
			<HStack space={2} alignItems="center">
			<IconButton
                onPress={() => navigation.navigate("Profile")}
				icon={<FontAwesome5 name="user-circle" />}
				borderRadius="full"
				_icon={{
					size: "xl",
				}}
			/>
			<Text>Header with icons and input here</Text>
			</HStack>

		</Center>
	);
};

export default HomeHeader;
