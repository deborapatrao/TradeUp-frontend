import {
    Box,
    Text,
    Button,
    // ScrollView,
} from "native-base";
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import ChartComponent from "./chart";

const ChartContainer = ({ navigation }) => {
    return (
        // <SafeAreaView>
        <ScrollView>
            {/* Background Color from the theme */}
            <Box bg={'primary.bg'}>
                <Box>
                    <ChartComponent />
                </Box>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Button alignSelf={'flex-start'} onPress={() => navigation.navigate('BuyAndSell')}>BuyAndSell</Button>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
                <Text color={'secondary.white'}>ChartContainer</Text>
            </Box>
        </ScrollView>
        // </SafeAreaView>
    )
}

export default ChartContainer