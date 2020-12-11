import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
};

const orderReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.BURGER_PURCHASE_BEGIN:
            return {
                ...state,
                loading: true
            };
        case actionTypes.BURGER_PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(action.orderDetails)
            };
        case actionTypes.BURGER_PURCHASE_FAIL:
            return {
                loading: false
            };
    };
};

export default orderReducer;
