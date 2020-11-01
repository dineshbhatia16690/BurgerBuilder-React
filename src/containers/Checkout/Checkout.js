import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredientsFromBurgerBuilder = {};
        for (let param of query.entries()) {
            // entries are in form of ['salad', '1']
            // added + sign to convert the value to a number
            ingredientsFromBurgerBuilder[param[0]] = +param[1];
        }
        this.setState({ingredients : ingredientsFromBurgerBuilder});
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
            </div>
        )
    }

}

export default Checkout;
