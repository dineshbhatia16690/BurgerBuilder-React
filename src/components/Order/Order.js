import React from "react";

import classes from './Order.css';


const order = (props) => {
    const transformedIngredients = [];
    for (let ig in props.ingredients) {
        transformedIngredients.push(
            {
                name: ig,
                quantity: props.ingredients[ig]
            }
        );
    }

    const ingredientOutput = transformedIngredients.map(ig => {
        return <span className={classes.SpanStyle} key={ig.name}> {ig.name}:{ig.quantity}</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD: {props.price}</strong></p>
        </div>
    );
};

export default order;
