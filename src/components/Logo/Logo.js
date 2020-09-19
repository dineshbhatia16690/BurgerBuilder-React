import React from "react";

import burgerLogo from '../../assets/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        {/*Can't provide the logo path as string in 'img src' since webpack would not be able
        to resolve it dynamically,it creates an output folder in which it all the imports resides,
        if we don't import it first, webpack wouldn't be able to resolve this path dynamically*/}
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default logo;
