import React, {Component} from "react";
import { connect } from "react-redux";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import GlobalErrorHandler from '../../GlobalErrorHandler/GlobalErrorHandler';
import * as actionTypes from '../../store/actions';

const INGREDIENT_ADD_ON_PRICE = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1,
    bacon: 1.2
}

class BurgerBuilder extends Component {

    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    // the reason we are passing totalPrice in this and not checking from state is
    // because when we add or remove the ingredients, state may not have the most updated
    // totalPrice.
    updatePurchaseState(totalPrice) {
        if (totalPrice > 4) {
            this.setState({purchasable: true});
        }
        else {
            this.setState({purchasable: false});
        }
    }

    addIngredientsHandler = (type) => {
        console.log(this.props);
        const updatedIngredientCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients};
        updatedIngredients[type] = updatedIngredientCount;

        const totalPriceUpdated = this.state.totalPrice + INGREDIENT_ADD_ON_PRICE[type];
        this.setState({totalPrice: totalPriceUpdated, ingredients: updatedIngredients});
        this.updatePurchaseState(totalPriceUpdated);
    }

    removeIngredientsHandler = (type) => {
        const currentIngredientCount = this.state.ingredients[type];
        if (currentIngredientCount < 1) {
            alert("Please add the ingredients first!");
            return;
        }

        const updatedIngredientsCount = this.state.ingredients[type] - 1;
        const updatedIngredients = { ...this.state.ingredients};
        updatedIngredients[type] = updatedIngredientsCount;

        const totalPriceUpdated = this.state.totalPrice - INGREDIENT_ADD_ON_PRICE[type];
        this.setState({totalPrice: totalPriceUpdated, ingredients: updatedIngredients});
        this.updatePurchaseState(totalPriceUpdated)
    }

    // we have to create an arrow function here since it has access to state through "this" keyword
    // In normal function this would not work(purchaseHandler() {..code})
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            // to encode the values and make it in a form "salad=1",...
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        // to concatenate values of the query params array separated by &
        // to notice the change, check URL after pressing continue
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disableButtonInfo = {...this.props.ings};
        for(let ingredientType in disableButtonInfo) {
            disableButtonInfo[ingredientType] = disableButtonInfo[ingredientType] <=0;
        }

        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        let burger = this.state.error? <p>Ingredients can't be loaded!</p>: <Spinner />;
        if (this.props.ings) {
            burger =(
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuilderControls
                    ingredientsAdded={this.props.onIngredientAdded}
                    ingredientsRemoved={this.props.onIngredientRemoved}
                    disableButton={disableButtonInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    currentPrice={this.state.totalPrice}/>
                </Aux>
            );

            orderSummary =
                <OrderSummary
                    ingredients={this.props.ings}
                    orderCancelled={this.purchaseCancelHandler}
                    orderContinued={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}/>

        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        // ings is we will access here and state.ingredients is from the redux store
        ings: state.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalErrorHandler(BurgerBuilder, axios));
