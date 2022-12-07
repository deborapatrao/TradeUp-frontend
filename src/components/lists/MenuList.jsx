import React from "react";
import {
	Box,
	Text,
	Button,
	Heading,
	Center,
	Image,
	FlatList,
	HStack,
	VStack,
	Spacer,
	Divider,
} from "native-base";
import { menuItems } from "../utils/constants";
import { Octicons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const MenuList = ({ navigation }) => {
	return (
		<>
			<FlatList
				data={menuItems}
				renderItem={({ item, index }) => (
					<Box
						key={index}
						borderTopWidth={index === 0 ? "1" : "0"}
						borderBottomWidth="1"
						_dark={{
							borderColor: "#2E2343",
						}}
						borderColor="#2E2343"
						pl={["0", "4"]}
						pr={["0", "5"]}
						padding="3.5"
						mx={5}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate(item.name)}
						>
							<HStack
								space={[2, 3]}
								justifyContent="space-between"
							>
								<VStack>
									<Text style={styles.menuItem}>
										{item.name}
									</Text>
								</VStack>
								<Icon
									as={Octicons}
									name="chevron-right"
									color="white"
									size={6}
								/>
							</HStack>
						</TouchableOpacity>
					</Box>
				)}
				keyExtractor={(item) => item.id}
				onPress={() => navigation.navigate("Home")}
			/>
		</>
	);
};

export default MenuList;

const styles = StyleSheet.create({
	menuItem: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},

});