import React from "react";

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            console.log(ingKey);
        return [...Array(props.ingredients[ingKey])].map((_, idx) => {
            return <BurgerIngredient key={ingKey+idx} type = {ingKey} />
        });
    });

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;
/* eslint-disable-line */
