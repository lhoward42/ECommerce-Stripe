import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../context/cart-context';
import Icon from '@mdi/react';
import { mdiBasket } from '@mdi/js';
import './cart-icon.styles.scss';
import { DeviceSize } from "../../utils/DeviceSize";
import { useMediaQuery } from "react-responsive";

const CartIcon = () => {
const { itemCount, cartItems } = useContext(CartContext);
const navigate = useNavigate();
console.log('CartItems', cartItems, itemCount);

const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet})

    return (
        <div className="cart-container">
            <Icon className="shopping-basket" path={mdiBasket} alt='shopping-cart-icon' size={isTablet ? 1.5 : 1.8} onClick={() => navigate('/cart')}/>
            {
                itemCount > 0 ? <span className="cart-count"> { itemCount } </span> : null
            }
           
        </div>
    )
} 

export default CartIcon