import React, {Component} from "react";

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_ADD_ON_PRICE = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1,
    bacon: 1.2
}

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        alert("Order Continued ...");
    }

    render() {
        const disableButtonInfo = {...this.state.ingredients};
        for(let ingredientType in disableButtonInfo) {
            disableButtonInfo[ingredientType] = disableButtonInfo[ingredientType] <=0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  orderCancelled={this.purchaseCancelHandler}
                                  orderContinued={this.purchaseContinueHandler}
                                  totalPrice={this.state.totalPrice}/>

                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuilderControls
                ingredientsAdded={this.addIngredientsHandler}
                ingredientsRemoved={this.removeIngredientsHandler}
                disableButton={disableButtonInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                currentPrice={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
