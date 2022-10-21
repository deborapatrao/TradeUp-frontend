import { View, Box, Text, Icon, Button } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth()

const Test = ({ navigation }) => {

	return (
        <Box safeArea>
            <Text>Test</Text>
            {/* <Icon size={5} ml={2} color={'#fff'} as={<Ionicons name="ios-search" />} /> */}
            <Text>
                <Icon size={5} ml={2} color={'#fff'} as={<Ionicons name="ios-search" />} />
            </Text>
            <Button onPress={() => navigation.navigate('InfoHome')}>InfoHome</Button>
        </Box>
        
	);
};

export default Test;
