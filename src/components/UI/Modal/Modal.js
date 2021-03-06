import React, {Component} from "react";

import classes from './Modal.css'
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

// We could have wrapped the export with React.memo which internally uses shouldComponentHook
class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children;
    }

    // just for verification that component is updated
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Modal.js] component updated');
    }
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh',
                        opacity: this.props.show ? '1' : 0
                    }}>

                    {this.props.children}
                </div>
            </Aux>
        );
    }

}

export default Modal;
