import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
	initializeAuth,
	getReactNativePersistence,
} from "firebase/auth/react-native";

const firebaseConfig = {
	apiKey: "AIzaSyAf6vDXgwA_enUYMWnpms8O8CNrOtTgjwg",
	authDomain: "trade-up-bc1be.firebaseapp.com",
	projectId: "trade-up-bc1be",
	storageBucket: "trade-up-bc1be.appspot.com",
	messagingSenderId: "202536715953",
	appId: "1:202536715953:web:3e4fff515fec7081188490",
	measurementId: "G-Y6MGLDQC6Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };