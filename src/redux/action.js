import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getAuth,
    signInWithCustomToken,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import { BASE_URL } from "../utils/api";
const serverUrl = BASE_URL;

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: "loginRequest" });
        const { data } = await axios.post(
            `${serverUrl}/login`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        await AsyncStorage.setItem("userIdToken", data.token);
        await AsyncStorage.setItem("userId", data.user.firebase_uuid);

        dispatch({ type: "loginSuccess", payload: data });

    } catch (error) {
        dispatch({
            type: "loginFailure",
            payload: error.message,
        });

    }
};

export const signup = (email, password, location) => async (dispatch) => {

    try {
        dispatch({ type: "signupRequest" });
        const { data } = await axios.post(
            `${serverUrl}/signup`,
            { email, password, location },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        await AsyncStorage.setItem("userIdToken", data.token);
        await AsyncStorage.setItem("userId", data.user.firebase_uuid);

        const delay = await setTimeout(function(){
            dispatch({ type: "signupSuccess", payload: data });
        }, 500); 


    } catch (error) {
        dispatch({
            type: "signupFailure",
            payload: error,
        });

    }
};

export const loadUser = (userIdToken) => async (dispatch) => {

    try {

        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken)

        const uid = await AsyncStorage.getItem("userId");
        const { data } = await axios.get(`${serverUrl}/me`, {
            headers: {
                Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                uid: uid
            },
        });

        dispatch({ type: "loadUserSuccess", payload: data });
    } catch (error) {
        dispatch({
            type: "loadUserFailure",
            payload: error.message,
        });

    }
};

export const saveLocation = (userIdToken, location) => async (dispatch) => {

    try {
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken);


        const { data } = await axios.post(
            `${serverUrl}/user/location`,
            { location },
            {
                headers: {
                    Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                },
            }
        );

        dispatch({ type: "loadUserSuccess", payload: data });
    } catch (error) {
        dispatch({
            type: "loadUserFailure",
            payload: error.message,
        });

    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: "logoutRequest" });

        await axios.post(`${serverUrl}/logout`);

        const auth = getAuth();
        await auth.signOut();

        await AsyncStorage.removeItem("userIdToken"); // remove the token from storage
        await AsyncStorage.removeItem("userId");
        dispatch({ type: "logoutSuccess" });

    } catch (error) {
        dispatch({
            type: "logoutFailure",
            payload: error.message,
        });

    }
};

export const skipTutorial = (userId, tutorialStatus) => async (dispatch) => {

    try {
        dispatch({ type: "tutorialRequest" });

        const userIdToken = await AsyncStorage.getItem(`userIdToken`);
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken)


        // console.log("skip dispatch running")
        const { data } = await axios.post(
            `${serverUrl}/user/tutorial`,
            { userId, tutorialStatus },
            {
                headers: {
                    Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({ type: "loadUserSuccess", payload: data });
    } catch (error) {
        // console.log("Error skip", error.message);

        dispatch({
            type: "loadUserFailure",
            payload: error.message,
        });

    }
};
