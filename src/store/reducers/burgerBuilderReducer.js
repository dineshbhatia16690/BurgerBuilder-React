import * as actionsTypes from '../actions/actionTypes';

const initialState = {
    ingredients : null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_ADD_ON_PRICE = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1,
    bacon: 1.2
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_ADD_ON_PRICE[action.ingredientName]
            };
        case actionsTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_ADD_ON_PRICE[action.ingredientName]
            };
        case actionsTypes.SET_INGREDIENTS:
            console.log('ingredients are in reducer: ', action.ingredients);
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case actionsTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }

};

export default burgerBuilderReducer;
