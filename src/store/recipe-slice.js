import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        recipes: [],
        loading: false,
        fetched: false,
        showListFilters: true,
        recipeError: false,
    },
    reducers: {
        fetchStart(state) {
            state.loading = true;
        },
        fetchSuccess(state, action) {
            state.recipes = action.payload.recipes;
            state.loading = false;
            state.fetched = true;
        },
        fetchFail(state, action) {
            state.recipeError = action.payload.error;
            state.loading = false;
        },
        uploadStart(state) {
            state.loading = true;
            state.fetched = false;
        },
        uploadSuccess(state) {
            state.loading = false;
        },
        uploadFail(state, action) {
            state.recipeError = action.payload.error;
            state.loading = false;
        },
        deleteStart(state) {
            state.loading = true;
            state.fetched = false;
        },
        deleteSuccess(state) {
            state.loading = false;
            state.fetched = false;
        },
        deleteFail(state, action) {
            state.recipeError = action.payload.error;
            state.loading = false;
        },
        toggleFilters(state) {
            state.showListFilters = !state.showListFilters;
        },
    },
});

export const recipeActions = recipeSlice.actions;
export default recipeSlice;
