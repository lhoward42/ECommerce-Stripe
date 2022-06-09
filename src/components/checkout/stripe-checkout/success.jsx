import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from '../../shared/layout';
import { CartContext } from '../../../context/cart-context'
import { Button } from '@mui/material'

const Success = () => {
    const { clearCart, cartItems } = useContext(CartContext);
    useEffect(() => {
        if (cartItems.length !== 0) { clearCart() }
    }, [clearCart, cartItems]);

    const navigate = useNavigate();

    return (
        <Layout>
        <div className="checkout">
            <h1>Thank you for your order</h1>
            <p>We are currently processing your order and
                 will send you a confirmation email shortly
                 </p>
                 <div>
                     <Button 
                      sx={{ color: "#3B1E57"}}
                     onClick={() => navigate('/shop')}
                     
                     variant="contained"
                     >
                         Continue Shopping
                     </Button>
                 </div>
        </div>
        </Layout>
    );
}

export default Success; 