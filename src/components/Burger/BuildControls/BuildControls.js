import React from "react";

import BuildControl from '../BuildControls/BuildControl/BuildControl';
import classes from './BuildControls.css'

const controls = [
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Salad', type: 'salad'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Price: <strong>{props.currentPrice.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientsAdded(ctrl.type)}
                removed={() => props.ingredientsRemoved(ctrl.type)}
                disableTypeButton={props.disableButton[ctrl.type]}
            />
        ))}
        <button
            onClick={props.ordered}
            className={classes.OrderButton}
            disabled={!props.purchasable}>ORDER NOW</button>
    </div>
);

export default buildControls;
