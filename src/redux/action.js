import axios from "axios";

const serverUrl = "http://localhost:8080/api";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" });
        const { data } = await axios.post(
            `${serverUrl}/users/login`,
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

        console.log("Error 1", error.response.data);
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "loadUserRequest" });

        const { data } = await axios.get(`${serverUrl}/users/me`);

        dispatch({ type: "loadUserSuccess", payload: data });
    } catch (error) {
        dispatch({
            type: "loadUserFailure",
            payload: error.response.data.message,
        });

        console.log("Error 2", error);
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: "logoutRequest" });

        await axios.post(`${serverUrl}/users/logout`);
        dispatch({ type: "logoutSuccess" });
    } catch (error) {
        dispatch({
            type: "logoutFailure",
            payload: error.response.data.message,
        });

        console.log("Error 3", error);
    }
};
