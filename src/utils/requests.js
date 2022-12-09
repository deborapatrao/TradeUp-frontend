import axios from "axios";
import { BASE_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getAuth,
    signInWithCustomToken,
} from 'firebase/auth';

export const marketOrder = async (url, data) => {

    try {
        const userId = await AsyncStorage.getItem("userId");
        const userIdToken = await AsyncStorage.getItem(`userIdToken`);
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken)

        // const response = await axios.post(`${BASE_URL}${url}`, { ...data, userId });
        const response = await axios.post(
            `${BASE_URL}${url}`,
            { ...data, userId },
            {
                headers: {
                    Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        // console.log('RESPONSE: ', response.data);

    } catch (error) {
        console.log(error);
    }
}

export const postData = async (url, data) => {

    try {
        const userId = await AsyncStorage.getItem("userId");
        const userIdToken = await AsyncStorage.getItem(`userIdToken`);
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken)

        // const response = await axios.post(`${BASE_URL}${url}`, { ...data, userId });
        const response = await axios.post(
            `${BASE_URL}${url}`,
            { ...data, userId },
            {
                headers: {
                    Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        // console.log('RESPONSE: ', response.data);

    } catch (error) {
        console.log(error.message);
    }
}

export const getWalletData = async (url) => {
    let data = null;
    try {
        const userId = await AsyncStorage.getItem("userId");
        const userIdToken = await AsyncStorage.getItem(`userIdToken`);
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken)

        // const response = await axios.post(`${BASE_URL}${url}`, {
        //     userId: userId
        // })

        const response = await axios.post(
            `${BASE_URL}${url}`,
            { userId: userId },
            {
                headers: {
                    Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // console.log('RESPONSE wallet: ', response.data);
        data = response.data;

    } catch (error) {
        console.log(error);
    }
    return data;
}

export const getBuyAndSellData = async (url, ticker) => {
    let data = null;
    try {
        const userId = await AsyncStorage.getItem("userId");
        const userIdToken = await AsyncStorage.getItem(`userIdToken`);
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken)

        // const response = await axios.post(`${BASE_URL}${url}`, {
        //     userId: userId,
        //     coinTicker: ticker
        // })

        const response = await axios.post(
            `${BASE_URL}${url}`,
            { userId: userId, coinTicker: ticker },
            {
                headers: {
                    Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // console.log('RESPONSE buysell: ', response.data);
        data = response.data;

    } catch (error) {
        console.log(error);
    }
    return data;
}

export const getTradeHistoryData = async (url) => {
    let data = null;
    try {
        const userId = await AsyncStorage.getItem("userId");
        const userIdToken = await AsyncStorage.getItem(`userIdToken`);
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken)

        // const response = await axios.post(`${BASE_URL}${url}`, {
        //     userId: userId,
        // })

        const response = await axios.post(
            `${BASE_URL}${url}`,
            { userId: userId, },
            {
                headers: {
                    Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // console.log('RESPONSE trade: ', response.data);
        data = response.data;


    } catch (error) {
        console.log(error);
    }
    return data;
}

export const getTrendingCoinsData = async (url) => {
    let data = null;

    try {
        const userIdToken = await AsyncStorage.getItem(`userIdToken`);
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken)

        // const response = await axios.get(`${BASE_URL}${url}`)
        const response = await axios.get(
            `${BASE_URL}${url}`,
            {
                headers: {
                    Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        data = response.data;

    } catch (error) {
        console.log(error);
    }
    return data;
}
export const getOrderHistoryData = async (url) => {
    try {
        const userId = await AsyncStorage.getItem(`userId`);
        const userIdToken = await AsyncStorage.getItem(`userIdToken`);
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken)
        // const response = await axios.post(`${BASE_URL}${url}`, {
        //     userId: userId
        // })
        const response = await axios.post(
            `${BASE_URL}${url}`,
            { userId: userId, },
            {
                headers: {
                    Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = response.data
        //console.log('RESPONSE History Order', response.data);
        return data;
    } catch (e) {
        console.log(e)
    }
}
export const getActiveOrderHistoryData = async (url) => {
    try {
        const userId = await AsyncStorage.getItem(`userId`);
        const userIdToken = await AsyncStorage.getItem(`userIdToken`);
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken)
        // const response = await axios.post(`${BASE_URL}${url}`, {
        //     userId: userId
        // })

        const response = await axios.post(
            `${BASE_URL}${url}`,
            { userId: userId, },
            {
                headers: {
                    Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = response.data
        // console.log('RESPONSE Active Order', response.data);
        return data;
    } catch (e) {
        console.log(e)
    }
}

export const getTopTraders = async (url, city) => {
    try {
        const userId = await AsyncStorage.getItem(`userId`);
        const userIdToken = await AsyncStorage.getItem(`userIdToken`);
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken)
        // const response = await axios.post(`${BASE_URL}${url}`, {
        //     userId: userId,
        //     city: city
        // })

        const response = await axios.post(
            `${BASE_URL}${url}`,
            { userId: userId, city: city },
            {
                headers: {
                    Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = response.data
        // console.log('RESPONSE Top Traders', response.data);
        return data;
    } catch (e) {
        console.log(e)
    }
}