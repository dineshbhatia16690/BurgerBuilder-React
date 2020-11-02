import React, { Component } from "react";

import classes from './CustomerData.css';
import Button from '../../../components/UI/Button/Button';

class CustomerData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        }
    };

    render() {

        return(
            <div className={classes.CustomerData}>
                <h4>Enter your details below</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                    <input className={classes.Input} type="address" name="address" placeholder="Your Address"/>
                    <input className={classes.Input} type="street" name="street" placeholder="Street Name"/>
                    <input className={classes.Input} type="zipcode" name="zipcode" placeholder="Zip Code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }
}

export default CustomerData;
