import React, { createContext, useReducer } from 'react';
import cartReducer, { sumItems } from './cart-reducer';

 export const CartContext = createContext();
 
 const cartFromStorage = localStorage.getItem('cart') ? 
    JSON.parse(localStorage.getItem('cart')) : [];

 const initialState = {cartItems: cartFromStorage, ...sumItems(cartFromStorage)};
   
const CartContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(cartReducer, initialState);
    const addProduct = ( product ) => dispatch({ type: 'ADD_ITEM', payload: { product: product  } });
    const update = (product, metadata, metadata2, quantity) => dispatch({type: 'UPDATE', payload: { product: product, metadata: metadata, metadata2: metadata2, quantity: quantity } });
    const decrease = (product, metadata, metadata2) => dispatch({type: 'DECREASE', payload: { product: product, metadata: metadata, metadata2: metadata2 } });
    const removeProduct = (product, metadata, metadata2) => dispatch({ type: 'REMOVE_ITEM', payload: { product: product, metadata: metadata, metadata2: metadata2 } });
    const addProdWAttribute = (product, metadata, metadata2, quantity) => dispatch({type: 'ADD ITEM W ATTRIBUTE', payload: { product: product, metadata: metadata, metadata2: metadata2, quantity: quantity }})
    const clearCart = () => dispatch({ type: 'CLEAR'});

    
    const contextValues = {
        ...state,
        addProduct,
        update,
        decrease,
        removeProduct,
        clearCart,
        addProdWAttribute,
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

