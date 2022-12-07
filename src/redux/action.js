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
        // console.log('data Token', data.token);
        // console.log('data User', data.user.firebase_uuid);

        await AsyncStorage.setItem("userIdToken", data.token);
        await AsyncStorage.setItem("userId", data.user.firebase_uuid);

        dispatch({ type: "loginSuccess", payload: data });

    } catch (error) {
        // console.log("Error 1", error);

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
        // console.log('data', data);
        // await AsyncStorage.multiSet([["userId", "userIdToken"], [data.userId, data.token]], (err) => {
        //     console.log(err);
        // });

        // console.log('data Token', data.token);
        // console.log('data User', data.user.firebase_uuid);

        await AsyncStorage.setItem("userIdToken", data.token);
        await AsyncStorage.setItem("userId", data.user.firebase_uuid);

        const delay = await setTimeout(function(){
            dispatch({ type: "signupSuccess", payload: data });
        }, 500); 


    } catch (error) {
        // console.log("Error 1", error);
        dispatch({
            type: "signupFailure",
            payload: error,
        });

    }
};

export const loadUser = (userIdToken) => async (dispatch) => {

    try {
        // dispatch({ type: "loadUserRequest" });
        // console.log('userIdToken: ', userIdToken);
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken(true)
                .then(function(idToken) {
                    // console.log(idToken)
                }).catch(function(error) {
                    console.log(error)
                });
              // ...
            } else {
              // User is signed out
              // ...
              console.log('user is signed out');
            }
          });

        const getTok = await signInWithCustomToken(auth, userIdToken)

        // auth.onIdTokenChanged(function(user) {
        //     if (user) {
        //       console.log(user)
        //     }
        //   });

        // console.log("getTok", getTok._tokenResponse.idToken);

        // https://securetoken.googleapis.com/v1/token?key=[API_KEY]

        const uid = await AsyncStorage.getItem("userId");
        const { data } = await axios.get(`${serverUrl}/me`, {
            headers: {
                Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
                uid: uid
            },
        });
        // console.log("Load user", data)
        dispatch({ type: "loadUserSuccess", payload: data });
    } catch (error) {
        // console.log("Error 2", error.message);

        dispatch({
            type: "loadUserFailure",
            payload: error.message,
        });

    }
};

export const saveLocation = (userIdToken, location) => async (dispatch) => {

    try {
        // dispatch({ type: "loadUserRequest" });
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken);

        // console.log("getTok", getTok._tokenResponse.idToken);

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
        // console.log("Error 2", error.message);

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
        // console.log("Error 3", error);
        dispatch({
            type: "logoutFailure",
            payload: error.message,
        });

    }
};

export const skipTutorial = (userId, tutorialStatus) => async (dispatch) => {

    try {
        dispatch({ type: "tutorialRequest" });

        // console.log("skip dispatch running")
        const { data } = await axios.post(
            `${serverUrl}/user/tutorial`,
            { userId, tutorialStatus },
            {
                headers: {
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
