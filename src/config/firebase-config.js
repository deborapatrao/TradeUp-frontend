import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyD_8v1cLnLsLUAX4_VFY_OADLsgqU78BHQ",
	authDomain: "tradeapp-44be9.firebaseapp.com",
	projectId: "tradeapp-44be9",
	storageBucket: "tradeapp-44be9.appspot.com",
	messagingSenderId: "790607552934",
	appId: "1:790607552934:web:7a20176669252e69d16f67",
	measurementId: "G-XJCB22EGJP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native';
// initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
// });