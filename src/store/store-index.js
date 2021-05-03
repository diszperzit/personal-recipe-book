import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import recipeSlice from './recipe-slice';

const store = configureStore({
    reducer: { auth: authSlice.reducer, recipe: recipeSlice.reducer },
});

export default store;
