import React, {Component} from "react";

import Modal from "../components/UI/Modal/Modal";
import Aux from "../hoc/Aux/Aux"

const globalErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        // We can't use componentDidMount hook since that runs after the render cycle so have to use componentWillMount hook
        // or the constructor since if the get api call using axios fail our application will be broken and we will keep
        // seeing the spinner, to see that in action change this hook and remove .json from the get axios call
        componentWillMount() {
            // store these interceptors into class variables to use them for ejection
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.use(this.requestInterceptor);
            axios.interceptors.response.use(this.responseInterceptor);

        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default globalErrorHandler;
