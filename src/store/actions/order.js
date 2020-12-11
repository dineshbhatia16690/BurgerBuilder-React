import {
    BURGER_PURCHASE_BEGIN,
    BURGER_PURCHASE_SUCCESS,
    BURGER_PURCHASE_FAIL
} from "./actionTypes";
import axios from "../../axios-orders";

export const burgerPurchaseSuccess = (orderDetails) => {
    return {
        type: BURGER_PURCHASE_SUCCESS,
        orderDetails: orderDetails
    };
};

export const burgerPurchaseFail = (error) => {
    return  {
        type: BURGER_PURCHASE_FAIL,
        error: error
    };
};

export const burgerPurchaseBegin = () => {
    return {
        type: BURGER_PURCHASE_BEGIN
    };
};

export const burgerPurchase = (orderData) => {
    return dispatch => {
        dispatch(burgerPurchaseBegin());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log('order successful, response: ', response);
                dispatch(burgerPurchaseSuccess(response.data));
            })
            .catch(error => {
                dispatch(burgerPurchaseFail(error));
            });
    };
};
