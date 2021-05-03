import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: false,
        refresh: false,
        userID: false,
        authInProgress: false,
        authenticated: false,
        showModal: false,
        authError: false,
    },
    reducers: {
        start(state) {
            state.authInProgress = true;
            state.authError = false;
        },
        success(state, action) {
            state.token = action.payload.token;
            state.refresh = action.payload.refresh;
            state.userID = action.payload.userID;
            state.authError = false;
            state.authInProgress = false;
            state.authenticated = true;
            state.showModal = false;
        },
        fail(state, action) {
            state.authError = action.payload.error;
            state.authInProgress = false;
        },
        logout(state) {
            state.token = false;
            state.userId = false;
            state.authenticated = false;
        },
        toggleModal(state) {
            state.showModal = !state.showModal;
            state.authError = false;
            state.authInProgress = false;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice;
