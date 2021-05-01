import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchRecipesStart = () => {
    return {
        type: actionTypes.FETCH_RECIPES_START,
    };
};
export const fetchRecipesSuccess = recipes => {
    return {
        type: actionTypes.FETCH_RECIPES_SUCCESS,
        recipes: recipes,
    };
};
export const fetchRecipesFail = error => {
    return {
        type: actionTypes.FETCH_RECIPES_FAIL,
        error:
            'Something went wrong while fetching the recipes. Please check your connection and try again after refreshing!',
    };
};

export const fetchRecipes = () => {
    return dispatch => {
        dispatch(fetchRecipesStart());
        axios
            .get('/recipes.json')
            .then(response => {
                const fetchedRecipes = [];
                for (const key in response.data) {
                    fetchedRecipes.push({ ...response.data[key] });
                }
                dispatch(fetchRecipesSuccess(fetchedRecipes));
            })
            .catch(error => {
                dispatch(fetchRecipesFail(error));
            });
    };
};

export const toggleListFilters = index => {
    return {
        type: actionTypes.TOGGLE_LIST_FILTERS,
        index: index,
    };
};

export const uploadRecipesStart = () => {
    return {
        type: actionTypes.UPLOAD_RECIPE_START,
    };
};
export const uploadRecipesSuccess = recipes => {
    return {
        type: actionTypes.UPLOAD_RECIPE_SUCCESS,
        recipes: recipes,
    };
};
export const uploadRecipesFail = error => {
    return {
        type: actionTypes.UPLOAD_RECIPE_FAIL,
        error:
            'Something went wrong while uploading the recipe. Please check your connection and try again after refreshing!',
    };
};

export const uploadRecipe = (recipe, token) => {
    return dispatch => {
        dispatch(uploadRecipesStart());
        axios
            .put(`/recipes/recipe${recipe.index}.json?auth=${token}`, recipe)
            .then(response => {
                dispatch(uploadRecipesSuccess(response));
                dispatch(fetchRecipes());
            })
            .catch(error => {
                dispatch(uploadRecipesFail(error));
            });
    };
};

export const deleteRecipeStart = () => {
    return {
        type: actionTypes.DELETE_RECIPE_START,
    };
};
export const deleteRecipeSuccess = recipes => {
    return {
        type: actionTypes.DELETE_RECIPE_SUCCESS,
        recipes: recipes,
    };
};
export const deleteRecipeFail = error => {
    return {
        type: actionTypes.DELETE_RECIPE_FAIL,
        error:
            'Something went wrong while deleting the recipe. Please check your connection and try again after refreshing!',
    };
};

export const deleteRecipe = (index, token) => {
    return dispatch => {
        dispatch(deleteRecipeStart());
        axios
            .delete(`/recipes/recipe${index}.json?auth=${token}`)
            .then(response => {
                dispatch(deleteRecipeSuccess(response));
                dispatch(fetchRecipes());
            })
            .catch(error => {
                dispatch(deleteRecipeFail(error));
            });
    };
};
