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
} from "native-base";
import { menuItems } from "../utils/constants";
import { Octicons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native";

const MenuList = ({ navigation }) => {



	return (
		<>
			<FlatList
				data={menuItems}
				renderItem={({ item }) => (
					<Box
						borderBottomWidth="1"
						_dark={{
							borderColor: "muted.50",
						}}
						borderColor="muted.800"
						pl={["0", "4"]}
						pr={["0", "5"]}
						padding="2"
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
									<Text
										_dark={{
											color: "secondary.lightGray",
										}}
										color="coolGray.800"
										bold
									>
										{item.name}
									</Text>
								</VStack>
								<Icon
									as={Octicons}
									name="chevron-right"
									color="white"
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
