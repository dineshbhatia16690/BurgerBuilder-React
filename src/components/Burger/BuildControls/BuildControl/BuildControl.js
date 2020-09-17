import React from "react";

import classes from './BuildControl.css'
// detects the name of the ingredient to be added
const buildControl = (props) => (

    <div className={classes.BuildControl}>
        <div className={classes.Label}>
            {props.label}
        </div>
        <button
            className={classes.Less}
            onClick={props.removed}
            disabled={props.disableTypeButton}>
            Less
        </button>
        <button
            className={classes.More}
            onClick={props.added}>
            More
        </button>
    </div>

);
export default buildControl;
