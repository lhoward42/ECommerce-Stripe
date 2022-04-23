import React, { Component } from 'react';

import APIURL from '../utils/environment';

 export const ProductsContext = React.createContext();

 export class ProductsContextProvider extends Component {
    state = {
         products: [],
    }
    componentDidMount() {
        this.fetchAllProducts();
    }

    fetchAllProducts = async () => {
        let res = await fetch(`${APIURL}/products/all`, { 
            method: "GET", 
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });
        let data = await res.json();
        this.setState({ products: data })
        console.log(data);
    }

    render () {
    return (
        <ProductsContext.Provider value={{ ...this.state, fetchAllProducts: this.fetchAllProducts }} >
            {this.props.children}
        </ProductsContext.Provider>
    )}
}

export default ProductsContextProvider;