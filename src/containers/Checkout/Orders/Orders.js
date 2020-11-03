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
        const fetchedOrders = [];
        axiosInstance.get('/orders.json').then(
            res => {
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({orders: fetchedOrders, loading: false});
            }
        ).catch(err => {
            this.setState({loading: false});
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        // + to convert the price to number
                        price={+order.price}/>
                ))}
            </div>
        )
    }
}

export default globalErrorHandler(Orders, axiosInstance);
