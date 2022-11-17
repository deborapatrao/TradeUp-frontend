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
import { StyleSheet } from "react-native";
import PriceStatic from '../../components/containers/market/PriceStatic';
import * as Notifications from 'expo-notifications';
import { postData } from '../../utils/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PriceAlertScreen = ({ navigation, route }) => {
    const [alertType, setAlertType] = useState('')
    const [alertValue, setAlertValue] = useState('')
    const { ticker } = route.params;

    const handleSetAlert = async () => {
        // const pushToken = await AsyncStorage.getItem("expoPushToken");
        // console.log(pushToken);


        // const dataToken = {
        //     token: 'ExponentPushToken[ULYivqCKoSg1JqYVNjr_yb]'
        // }
        // const response = await postData('/user/token', dataToken);
        // console.log(response);

        const dataAlert = {
            coinTicker: ticker,
            price: 16582.00,
            alertType: 'up'
        }
        const response = await postData('/crypto/alert', dataAlert);
        console.log(response);

        // await Notifications.scheduleNotificationAsync({
        //     content: {
        //         title: "You've got mail! 📬",
        //         body: 'Here is the notification body',
        //         data: { data: 'goes here' },
        //         launchImageName: 'https://i.stack.imgur.com/YlzsO.png'
        //     },
        //     trigger: { seconds: 2 },
        // });

        // const registerForPushNotificationsAsync = async () => {
        //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
        //     let finalStatus = existingStatus;
        //     console.log('existingStatus', existingStatus);
        //     if (existingStatus !== 'granted') {
        //         const { status } = await Notifications.requestPermissionsAsync();
        //         finalStatus = status;
        //     }
        //     if (finalStatus !== 'granted') {
        //         alert('Failed to get push token for push notification!');
        //         return;
        //     }
        //     const token = (await Notifications.getExpoPushTokenAsync()).data;
        //     console.log(token);
        //     this.setState({ expoPushToken: token });

        //     if (Platform.OS === 'android') {
        //         Notifications.setNotificationChannelAsync('default', {
        //             name: 'default',
        //             importance: Notifications.AndroidImportance.MAX,
        //             vibrationPattern: [0, 250, 250, 250],
        //             lightColor: '#FF231F7C',
        //         });
        //     }
        // };
        // registerForPushNotificationsAsync()
        // const response = await postData('user/token', data);
        // console.log(response);
    }

    return (
        <VStack safeArea backgroundColor={'#171122'} h={'100%'}>
            <Text style={styles.text} ml={2}>ETHUSDT</Text>
            <PriceStatic ticker={ticker} />

            <Box m={2} mt={10}>
                <Text style={styles.text}>Alert Type</Text>
                <Select selectedValue={alertType} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setAlertType(itemValue)} defaultValue={'rise'}>
                    <Select.Item label="Price drops to" value="drop" />
                    <Select.Item label="Price rises to" value="rise" />
                </Select>
            </Box>
            <Box m={2}>
                <Text style={styles.text}>Value</Text>
                <Input keyboardType={'numeric'} style={styles.text} value={alertValue} onChangeText={value => setAlertValue(value)}></Input>
            </Box>
            <Button m={2} backgroundColor={'#386AF5'} onPress={handleSetAlert}>Create Alert</Button>
        </VStack>
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
