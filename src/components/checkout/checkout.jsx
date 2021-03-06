import React, { useContext,useState } from "react";
import { CartContext } from '../../context/cart-context';
import Layout from "../shared/layout";
import ShippingAddress from './custom-checkout/shipping-address';
import StripeCheckout from "./stripe-checkout/stripe-checkout";
import './checkout.styles.scss';

const Checkout = () => {
    const { itemCount, total } = useContext(CartContext);
    const [shipping, setShipping] = useState(null);
    const addressShown = {
        display: (shipping ? 'none' : 'black')
    }
    const cardShown = {
        display: (shipping ? 'block' : 'none')
    }
    return (
        <Layout>
            <div className="checkout">
                <h2> Checkout Summary </h2>
                <h3>{ `Total Items: ${itemCount}`}</h3>
                <h4>{ `Amount to Pay: $${total}`}</h4>
                <div style={addressShown}>
                    {/* when the user fill out their shipping information 
                    it's sent right back up to the checkout component */}
                    <ShippingAddress setShipping={setShipping} />
                </div>
                <div style={cardShown}>
                    <StripeCheckout />
                </div>
            </div>
        </Layout>
    )
}

export default Checkout;