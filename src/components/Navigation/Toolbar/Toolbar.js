import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo'

const toolbar = (props) => (
    // eslint-disable-next-line no-unused-expressions
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            ...
        </nav>
    </header>
);

export default toolbar;
