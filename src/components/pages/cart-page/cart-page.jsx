import React from 'react';
import { useContext } from 'react/cjs/react.development';
import { CartContext } from '../../../context/cart-context';
import Layout from '../../shared/layout';
import CartItem from './cart-item';
import Total from './total';
import CartSign from '../../../assets/CartSign2.png'
import './cart-page.styles.scss'

const CartPage = () => {
    const { cartItems, itemCount, total, update, decrease, removeProduct, clearCart } = useContext(CartContext);
    const funcs = { update, decrease, removeProduct }

    
    return (
        <Layout>
            <>
            {/* <div className='sign'><img className='cart-sign' src={CartSign} alt='shop'/></div> */}
                <h1 style={{ fontSize: '3rem'}}>Cart</h1>
                {
                    cartItems.length === 0 ? <div className='empty-cart'>Your Cart is Empty</div>
                    :
                    <>
                    <div className='cart-page'>
                        <div className='cart-item-container'>
                            {
                                cartItems.map((item, index) => <CartItem { ...item} key={index + 1} {...funcs} />)
                            }
                        </div>
                        <Total itemCount={itemCount} total={total} clearCart={clearCart} />
                    </div>
                    
                    </>
                }
            </>
        </Layout>
    )
}

export default CartPage
