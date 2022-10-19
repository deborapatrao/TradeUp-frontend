import {
    Box,
    Text,
    Button,
    ScrollView,
} from "native-base";
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import ChartComponent from "./chart";

const ChartContainer = ({ navigation }) => {
    return (
        // <SafeAreaView>
        <ScrollView  bg={'primary.bg'} paddingX={4}> 
            <Box>
                <Box>
                    <ChartComponent />
                </Box>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Button alignSelf={'flex-start'} onPress={() => navigation.navigate('BuyAndSell')}>BuyAndSell</Button>
            </Box>
        </ScrollView> 
        // </SafeAreaView>
    )
}

export default ChartContainer