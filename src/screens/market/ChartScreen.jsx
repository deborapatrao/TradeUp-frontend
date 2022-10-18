import React from 'react'
import {
    Box,
    Text,
    Button,
    View
} from "native-base";
import ChartContainer from '../../components/containers/market/ChartContainer';

const ChartScreen = ({ navigation }) => {

    return (
        <ChartContainer navigation={navigation} />
    );
};

export default ChartScreen;
