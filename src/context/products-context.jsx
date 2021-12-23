import React, { createContext, useState } from 'react';
import SHOP_DATA from '../shop/index';

export const ProductsContext = createContext();

const ProductContextProvider = ({children}) => {
    const [products] = useState(SHOP_DATA);

    return (
        <ProductsContext.Provider value={{ products }} >
            {
                children
            }
        </ProductsContext.Provider>
    )
}

export default ProductContextProvider