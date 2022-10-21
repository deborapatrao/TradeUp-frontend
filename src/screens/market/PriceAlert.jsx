import React, { useState } from 'react'
import {
    Box,
    Text,
    Select,
    CheckIcon,
    VStack,
    Divider,
    Input,
    Button
} from "native-base";
import { StyleSheet} from "react-native";
import PriceStatic from '../../components/containers/market/PriceStatic';

const PriceAlertScreen = () => {
    const [alertType, setAlertType] = useState()
    const [valueUser,setValueUser] = useState()

    return (
        <VStack  safeArea backgroundColor={'#171122'} h={'100%'}>
            <Text style={styles.text} ml={2}>ETHUSDT</Text>
            <PriceStatic />
            <Divider />
            <Box  m={2}>
                <Text style={styles.text}>Alert Type</Text>
                <Select selectedValue={alertType} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setAlertType(itemValue)}>
                    <Select.Item label="Price drops to" value="drop" />
                    <Select.Item label="High price" value="high" />
                </Select>
            </Box>
            <Box m={2}>
                <Text style={styles.text}>Value</Text>
                <Input style={styles.text} value={valueUser} onChangeText={value => setValueUser(value)}></Input>
            </Box>
            <Button m={2} backgroundColor={'#386AF5'} >Create Alert</Button>
        </VStack>
    );
};

const styles = StyleSheet.create({
    text:{
        color:'#F2F2F2',
        fontSize:16,
        marginBottom:2,
    }
});

export default PriceAlertScreen;
