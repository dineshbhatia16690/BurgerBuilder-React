import React, { Component } from "react";

import Order from '../../../components/Order/Order';
import axiosInstance from "../../../axios-orders";
import globalErrorHandler from "../../../GlobalErrorHandler/GlobalErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        console.log('In Orders ...');
        const fetchedOrders = [];
        axiosInstance.get('/orders.json').then(
            res => {
                for (let key in res) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({orders: fetchedOrders, loading: false});
                console.log(res);
            }
        ).catch(err => {
            this.setState({loading: false});
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        )
    }
}

export default globalErrorHandler(Orders, axiosInstance);
