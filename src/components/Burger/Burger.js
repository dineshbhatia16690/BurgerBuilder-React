import React from "react";

import { withRouter } from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {

    console.log(props);

    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, idx) => {
            return <BurgerIngredient key={ingKey+idx} type = {ingKey} />
        });
    }).reduce((currArray, element) => {
        return currArray.concat(element);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default withRouter(burger);
