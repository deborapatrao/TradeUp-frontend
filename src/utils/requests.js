import axios from "axios";
import { BASE_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';





export const marketOrder = async (url, data) => {

    try {
        const userId = await AsyncStorage.getItem("userId");

        const response = await axios.post(`${BASE_URL}${url}`, { ...data, userId });

        console.log('RESPONSE: ', response.data);

    } catch (error) {
        console.log(error);
    }
}

export const getWalletData = async (url) => {
    let data = null;
    try {
        const userId = await AsyncStorage.getItem("userId");

        const response = await axios.post(`${BASE_URL}${url}`, {
            userId: userId
        })

        console.log('RESPONSE: ', response.data);
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

        const response = await axios.post(`${BASE_URL}${url}`, {
            userId: userId,
            coinTicker: ticker
        })

        console.log('RESPONSE: ', response.data);
        data = response.data;

    } catch (error) {
        console.log(error);
    }
    return data;
}