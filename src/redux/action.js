import axios from "axios";
import {
    getAuth,
    signInWithCustomToken,
} from 'firebase/auth';
const serverUrl = "http://localhost:8080/api";

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

        dispatch({ type: "loginSuccess", payload: data });
    } catch (error) {
        dispatch({
            type: "loginFailure",
            payload: error.response.data.message,
        });

        console.log("Error 1", error);
    }
};

export const signup = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: "signupRequest" });
        const { data } = await axios.post(
            `${serverUrl}/signup`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({ type: "signupSuccess", payload: data });
    } catch (error) {
        dispatch({
            type: "signupFailure",
            payload: error.response.data.message,
        });

        console.log("Error 1", error.response.data.message);
    }
};

export const loadUser = (userIdToken) => async (dispatch) => {

    try {
        // dispatch({ type: "loadUserRequest" });
        const auth = getAuth();
        const getTok = await signInWithCustomToken(auth, userIdToken);

        console.log("getTok", getTok._tokenResponse.idToken);

        const { data } = await axios.get(`${serverUrl}/me`, {
            headers: {
                Authorization: `Bearer ${getTok._tokenResponse.idToken}`,
            },
        });
        // console.log("Load user", data)
        dispatch({ type: "loadUserSuccess", payload: data });
    } catch (error) {
        dispatch({
            type: "loadUserFailure",
            payload: error.response.data.message,
        });

        console.log("Error 2", error.response.data.message);
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: "logoutRequest" });

        await axios.post(`${serverUrl}/logout`);

        // const auth = getAuth();
        // await firebaseSignOut(auth);

        dispatch({ type: "logoutSuccess" });
    } catch (error) {
        dispatch({
            type: "logoutFailure",
            payload: error.response.data.message,
        });

        console.log("Error 3", error);
    }
};
