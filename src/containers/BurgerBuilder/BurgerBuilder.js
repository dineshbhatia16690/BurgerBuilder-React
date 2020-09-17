import React, {Component} from "react";

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 4
    }

    addIngredientsHandler = (type) => {
        const updatedIngredientCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients};
        updatedIngredients[type] = updatedIngredientCount;

        const totalPriceUpdated = this.state.totalPrice + INGREDIENT_ADD_ON_PRICE[type];
        this.setState({totalPrice: totalPriceUpdated, ingredients: updatedIngredients});
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
    }

    render() {
        const disableButtonInfo = {...this.state.ingredients};
        for(let ingredientType in disableButtonInfo) {
            disableButtonInfo[ingredientType] = disableButtonInfo[ingredientType] <=0;
        }
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuilderControls
                ingredientsAdded={this.addIngredientsHandler}
                ingredientsRemoved={this.removeIngredientsHandler}
                disableButton={disableButtonInfo}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
