import React from 'react';

import classes from './Sidedrawer.css';
import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const sideDrawer = (props) => {

    return (
        <div className={classes.SideDrawer}>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer;
