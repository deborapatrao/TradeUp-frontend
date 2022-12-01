import { createReducer } from "@reduxjs/toolkit"; 

export const authReducer = createReducer({}, {
    loginRequest: (state) => {
        state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.message = action.payload.message
    },
    loginFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    signupRequest: (state) => {
        state.loading = true;
    },
    signupSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.message = action.payload.message
    },
    signupFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    loadUserRequest: (state) => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
    },
    loadUserFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    logoutRequest: (state) => {
        state.loading = true;
    },
    logoutSuccess: (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.token = null;
    },
    logoutFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
    },

    tutorialRequest: (state) => {
        state.loading = true;
    },
    tutorialSuccess: (state) => {
        state.loading = false;
        state.user = action.payload.user;
        state.tutorial = false;
    },
    tutorialFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearError: (state) => {
        state.error = null;
    }, 
    clearMessage: (state) => {
        state.message = null;
    },

    keepAuth: (state, action) => {
        // state.loading = false;
        // state.isAuthenticated = true;
        // state.token = action.payload.token;
        // state.user = action.payload.user;
        // state.message = action.payload.message
        // state.message = action.payload.message
    },
})