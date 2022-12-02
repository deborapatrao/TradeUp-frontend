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
import PriceAlertDialogComponent from '../../components/utils/PriceAlertDialogComponent';

const PriceAlertScreen = ({ navigation, route }) => {
    const [alertType, setAlertType] = useState('up')
    const [alertValue, setAlertValue] = useState('')
    const { ticker } = route.params;
    const [alert, setAlert] = useState(false);

    const handleSetAlert = async () => {

        
        // const pushToken = await AsyncStorage.getItem("expoPushToken");
        // console.log(pushToken);


        // const dataToken = {
        //     token: 'ExponentPushToken[ULYivqCKoSg1JqYVNjr_yb]'
        // }
        // const response = await postData('/user/token', dataToken);
        // console.log(response);
        // console.log(alertType, parseFloat(alertValue));

        const dataAlert = {
            coinTicker: ticker,
            price: parseFloat(alertValue),
            alertType: alertType
        }
        const response = await postData('/crypto/alert', dataAlert);
        console.log(response);
        
        setAlert(true);

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
        <PriceAlertDialogComponent alert={alert} setAlert={setAlert} />
        </>
        // <PriAlertDialogComponent alert={alert} setAlert={setAlert} />
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
