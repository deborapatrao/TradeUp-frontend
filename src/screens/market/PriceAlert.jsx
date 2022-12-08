import React, { useState } from 'react'
import {
    Box,
    Text,
    Select,
    CheckIcon,
    VStack,
    Divider,
    Input,
    Button,
    useToast,
    Alert,
    HStack
} from "native-base";
import { StyleSheet, Dimensions } from "react-native";
import PriceStatic from '../../components/containers/market/PriceStatic';
import * as Notifications from 'expo-notifications';
import { postData } from '../../utils/requests';

const PriceAlertScreen = ({ navigation, route }) => {
    const [alertType, setAlertType] = useState('up')
    const [alertValue, setAlertValue] = useState('')
    const { ticker } = route.params;
    const toast = useToast();
    const screenWidth = Dimensions.get('window').width;

    const handleSetAlert = async () => {


        const dataAlert = {
            coinTicker: ticker,
            price: parseFloat(alertValue),
            alertType: alertType
        }
        const response = await postData('/crypto/alert', dataAlert);
        console.log(response);
    toast.show({
        placement: "top",
        variant: "solid",
        top: 30,
        render: () => {
            return <Box width={screenWidth*.95} borderRadius={"5"} overflow="hidden" marginTop={20}>
                    <Alert status={"success"} backgroundColor={'supporting.lightGreen'} variant={"solid"} alignItems={"flex-start"}>
                    <HStack alignItems={'center'} space={2}>
                    <Alert.Icon />
                    <Text fontSize="md" fontWeight="bold" flexShrink={1} paddingLeft={20}>
                    Price Alert Saved!
                    </Text>
                    </HStack>
                    </Alert>
                </Box>
          }
        });
    }

    return (
        <>
        <VStack safeArea backgroundColor={'#171122'} h={'100%'}>

            <Text style={styles.text} ml={2}>{ticker}</Text>
            <PriceStatic ticker={ticker} />

            <Box m={2} mt={10}>
                <Text style={styles.text}>Alert Type</Text>
                <Select selectedValue={alertType} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setAlertType(itemValue)} defaultValue={alertType}>
                    <Select.Item label="Price rises to" value="up" />
                    <Select.Item label="Price drops to" value="down" />
                </Select>
            </Box>
            <Box m={2}>
                <Text style={styles.text}>Value</Text>
                <Input keyboardType={'numeric'} style={styles.text} value={alertValue} onChangeText={value => setAlertValue(value)}></Input>
            </Box>
            <Button m={2} backgroundColor={'#386AF5'} onPress={handleSetAlert}>Create Alert</Button>
            </VStack>
            
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#F2F2F2',
        fontSize: 16,
        marginBottom: 2,
    }
});

export default PriceAlertScreen;