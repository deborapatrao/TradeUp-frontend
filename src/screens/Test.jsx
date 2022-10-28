import { View, Box, Text, Icon, Button, Center } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth()

const Test = ({ navigation }) => {
    return (
        <Center bgColor={'primary.bg'} flex={1}>
            <Text fontSize={40}>Not yet. Sorry, guys...</Text>
        </Center>

    );
};

export default Test;
