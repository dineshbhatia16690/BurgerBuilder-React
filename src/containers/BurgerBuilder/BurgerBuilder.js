import React, {Component} from "react";
import { connect } from "react-redux";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import GlobalErrorHandler from '../../GlobalErrorHandler/GlobalErrorHandler';
// index.js can always be omitted for import since it by default looks for index.js,
// adding just for clarity
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
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
        this.props.history.push('/checkout');
    }

    render() {
        console.log('ingredients: ', this.props.ings);
        const disableButtonInfo = {...this.props.ings};
        for(let ingredientType in disableButtonInfo) {
            disableButtonInfo[ingredientType] = disableButtonInfo[ingredientType] <=0;
        }

        let orderSummary = null;
        let burger = this.props.error? <p>Ingredients can't be loaded!</p>: <Spinner />;
        if (this.props.ings) {
            burger =(
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuilderControls
                    ingredientsAdded={this.props.onIngredientAdded}
                    ingredientsRemoved={this.props.onIngredientRemoved}
                    disableButton={disableButtonInfo}
                    purchasable= { this.props.price > 4 }
                    ordered={this.purchaseHandler}
                    currentPrice={this.props.price}/>
                </Aux>
            );
            orderSummary =
                <OrderSummary
                    ingredients={this.props.ings}
                    orderCancelled={this.purchaseCancelHandler}
                    orderContinued={this.purchaseContinueHandler}
                    totalPrice={this.props.price}/>

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
        // so fetching the ingredients and totalPrice from global state or redux store.
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalErrorHandler(BurgerBuilder, axios));
