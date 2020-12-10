import * as actionTypes from './actionTypes';
import axiosInstance from "../../axios-orders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const initIngredients = () => {
    return dispatch => {
        // make sure firebase has default ingredients on /ingredients endpoint
        axiosInstance.get('/ingredients.json')
            .then( response => {
                console.log('response is :', response.data);
                dispatch(setIngredients(response.data));
            })
            .catch(err => {
            dispatch(fetchIngredientsFailed());
        });
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
