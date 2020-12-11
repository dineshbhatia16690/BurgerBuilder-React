import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from './CustomerData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as orderActions from '../../../store/actions/index';
import GlobalErrorHandler from '../../../GlobalErrorHandler/GlobalErrorHandler';

class CustomerData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        }
    };

    orderPlaceHandler = (event) => {
        // to prevent the default behavior of the form(where this method is triggered from) which is to send a request
        event.preventDefault();

        const customerOrder = {
            ingredients: this.props.ings,
            // price ideally should be calculated on the server side,
            // so that no one can tweak with it in between the http call
            price: this.props.price,
            customer: {
                name: 'Dinesh',
                email: 'test@test.com',
                address: {
                    country: 'USA',
                    street: 'test street',
                    zipCode: '12345'
                }
            },
            deliveryMethod: 'fastest'
        }
        // firebase provides mongo like db, so all we have to provide is '/endpoint-name.json' to the base URL
        // and a tree like structure will be created in firebase. Keep in mind '.json' is required, its unique to firebase.

        this.props.onOrderPlace(customerOrder);
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                <input className={classes.Input} type="address" name="address" placeholder="Your Address"/>
                <input className={classes.Input} type="street" name="street" placeholder="Street Name"/>
                <input className={classes.Input} type="zipcode" name="zipcode" placeholder="Zip Code"/>
                <Button
                    btnType="Success"
                    clicked={this.orderPlaceHandler}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return(
            <div className={classes.CustomerData}>
                <h4>Enter your details below</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderPlace: (orderData) => dispatch(orderActions.burgerPurchase(orderData))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(GlobalErrorHandler(CustomerData, axios));
