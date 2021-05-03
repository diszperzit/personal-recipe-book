import axios from '../axios';
import { recipeActions } from './recipe-slice';

export const fetchRecipes = () => {
    return dispatch => {
        dispatch(recipeActions.fetchStart());
        axios
            .get('/recipes.json')
            .then(response => {
                const fetchedRecipes = [];
                for (const key in response.data) {
                    fetchedRecipes.push({ ...response.data[key] });
                }
                dispatch(
                    recipeActions.fetchSuccess({ recipes: fetchedRecipes })
                );
            })
            .catch(error => {
                dispatch(
                    recipeActions.fetchFail({
                        error:
                            'Something went wrong while fetching the recipes. Please check your connection and try again after refreshing!',
                    })
                );
            });
    };
};

export const uploadRecipe = (recipe, token) => {
    return dispatch => {
        dispatch(recipeActions.uploadStart());
        axios
            .put(`/recipes/recipe${recipe.index}.json?auth=${token}`, recipe)
            .then(response => {
                dispatch(recipeActions.uploadSuccess());
                dispatch(fetchRecipes());
            })
            .catch(error => {
                dispatch(
                    recipeActions.uploadFail({
                        error:
                            'Something went wrong while uploading the recipe. Please check your connection and try again after refreshing!',
                    })
                );
            });
    };
};

export const deleteRecipe = (index, token) => {
    return dispatch => {
        dispatch(recipeActions.deleteStart());
        axios
            .delete(`/recipes/recipe${index}.json?auth=${token}`)
            .then(response => {
                dispatch(recipeActions.deleteSuccess());
                dispatch(fetchRecipes());
            })
            .catch(error => {
                dispatch(
                    recipeActions.deleteFail({
                        error:
                            'Something went wrong while deleting the recipe. Please check your connection and try again after refreshing!',
                    })
                );
            });
    };
};
