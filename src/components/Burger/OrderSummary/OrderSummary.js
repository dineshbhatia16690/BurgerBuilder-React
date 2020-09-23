import React from "react";

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {igKey}
                    </span> : {props.ingredients[igKey]}
                </li>
            )
        })

    return (
        <Aux>
            <h3>Your Order!</h3>
            <p>Here is your burger with ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.orderCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.orderContinued}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;
