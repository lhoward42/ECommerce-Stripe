import React, { createContext, useReducer } from 'react';
import cartReducer, { sumItems } from './cart-reducer';

 export const CartContext = createContext();
 
 const cartFromStorage = localStorage.getItem('cart') ? 
    JSON.parse(localStorage.getItem('cart')) : [];

 const initialState = {cartItems: cartFromStorage, ...sumItems(cartFromStorage)};
   
const CartContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(cartReducer, initialState);
    const addProduct = (product, metadata) => dispatch({ type: 'ADD_ITEM', payload: { product: product, metadata: metadata } });
    const increase = (product, metadata) => dispatch({type: 'INCREASE', payload: { product: product, metadata: metadata } });
    const decrease = (product) => dispatch({type: 'DECREASE', payload: product });
    const removeProduct = (product) => dispatch({ type: 'REMOVE_ITEM', payload: product });
    const addProdWNewAttribute = (product, metadata) => dispatch({type: 'ADD ITEM W NEW ATTRIBUTE', payload: { product: product, metadata: metadata  }})
    const clearCart = () => dispatch({ type: 'CLEAR'});

    
    const contextValues = {
        ...state,
        addProduct,
        increase,
        decrease,
        removeProduct,
        clearCart,
        addProdWNewAttribute,
    }

    return (
        <CartContext.Provider value={ contextValues }>
            {
                children
            }
        </CartContext.Provider>
    )
}

export default CartContextProvider

