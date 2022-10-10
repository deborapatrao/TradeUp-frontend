import React from 'react'
import {
    Box,
    Text,
    Button
} from "native-base";

const ChartScreen = ({ navigation }) => {

    return (
        <Box safeArea>
            <Text>ChartScreen</Text>
            <Button alignSelf={'flex-start'} onPress={() => navigation.navigate('BuyAndSell')}>BuyAndSell</Button>
        </Box>
    );
};

export default ChartScreen;
