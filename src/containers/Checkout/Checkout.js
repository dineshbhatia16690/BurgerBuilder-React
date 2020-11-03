import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CustomerData from "./CustomerData/CustomerData";

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice : 0
    }

    // changing this to componentWillMount since we need to set the state before mounting the component
    // since the ingredients default value is null and we are passing the ingredients in the render of Route path
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredientsFromBurgerBuilder = {};
        let price = 0;
        for (let param of query.entries()) {
            // entries are in form of ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                // added + sign to convert the value to a number
                ingredientsFromBurgerBuilder[param[0]] = +param[1];
            }
        }
        this.setState({ingredients : ingredientsFromBurgerBuilder, totalPrice : price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        // contact-data page is yet to be created but to see the replace in action, notice the url changes on "continue"
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'}
                        render={(props) => (<CustomerData
                                            ingredients={this.state.ingredients}
                                            price={this.state.totalPrice}
                                            {...props}/>)}/>
            </div>
        )
    }

}

export default Checkout;
