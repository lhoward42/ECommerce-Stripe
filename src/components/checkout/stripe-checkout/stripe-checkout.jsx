import React, { useState, useContext } from "react";
import { useStripe } from '@stripe/react-stripe-js';
import { CartContext } from '../../../context/cart-context';
import { fetchFromAPI } from "../../../helpers";
import Layout from "../../shared/layout";
import { Button } from "@mui/material"

const StripeCheckout = () => {
    const [email, setEmail] = useState('');
    const { cartItems } = useContext(CartContext);
    const stripe = useStripe();
    const handleGuestCheckout = async (e) => {
        e.preventDefault();
        const line_items = cartItems.map( item => {
            
            return {
                quantity: item.quantity,
                price_data: {
                    currency: 'usd',
                    unit_amount: item.price * 100, //Stripe formats amount in cents
                    product_data: {
                        name: `${item.title} - ${item.metadata.property}`,
                        description: item.description,
                        images: [item.imageUrl],
                        metadata: item.metadata //for multiple images create a .map
                    }
                }
            }
        });

        const response = await fetchFromAPI('create-checkout-session', {
            body: { line_items, customer_email: email },
        });

        const { sessionId } = response; 
        const { error } = await stripe.redirectToCheckout({
            sessionId
        });

        if (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
        <form onSubmit={handleGuestCheckout}>
            <div>
                <input 
                type='email'
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
                className="nomad-input" />
            </div>
            <div className="submit-btn">
                <Button type='submit' variant="contained" className="button nomad-btn submit">
                    Checkout
                </Button>
            </div>
        </form>
        </Layout>
    )
}

export default StripeCheckout;