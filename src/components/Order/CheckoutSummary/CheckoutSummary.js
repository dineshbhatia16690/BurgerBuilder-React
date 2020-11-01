import React from "react";

import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>Seems delicious!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
                <Button
                    btnType="Danger"
                    clicked>CANCEL</Button>
                <Button
                    btnType="Success"
                    clicked>CONTINUE</Button>
            </div>

        </div>
        );
}

export default checkoutSummary;
