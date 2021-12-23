import React from "react";
import Icon from '@mdi/react';
import { mdiShoppingOutline } from '@mdi/js';
import './cart-icon.styles.scss'

const CartIcon = () => {
    return (
        <div className="cart-container">
            <Icon path={mdiShoppingOutline} alt='shopping-cart-icon' size={1.5} />
            <span className="cart-count"> 5 </span>
        </div>
    )
} 

export default CartIcon