// import Main from "./Main";
import "./src/config/firebase-config"
import React, { useEffect, useRef, useState } from 'react';
import RootNavigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { customTheme } from "./src/theme";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
        icon: 'https://i.stack.imgur.com/YlzsO.png',
    }),
});


export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();



    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            console.log(token);
            if (token) {
                AsyncStorage.setItem("expoPushToken", token);
                setExpoPushToken(token)
            }
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const [fontsLoaded] = useFonts({
        'sfProFont': require('./assets/fonts/SF-Pro.ttf'),
    });

    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }


    return (
        <Provider store={store}>
            <NativeBaseProvider theme={customTheme}>
                <SafeAreaProvider>
                    <RootNavigation />
                </SafeAreaProvider>
            </NativeBaseProvider>
        </Provider>
    );
}

// async function sendPushNotification(expoPushToken) {
//     const message = {
//       to: expoPushToken,
//       sound: 'default',
//       title: 'Original Title',
//       body: 'And here is the body!',
//       data: { someData: 'goes here' },
//     };

//     await fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Accept-encoding': 'gzip, deflate',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });
//   }

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);

    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}