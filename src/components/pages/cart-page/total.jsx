import React from 'react';
import { useNavigate } from 'react-router-dom';

const Total = ({ itemCount, total, clearCart }) => {
    const navigate = useNavigate()
    return (
        <div className='total-container'>
            <div className='total'>
                <p>Total Items: {itemCount}</p>
                <p>{`Total: $${(Math.round(total * 100)/100).toFixed(2)} `}</p>
            </div>            
            <div className='checkout'>
                <button className='button' 
                style={{ background: '#3B1E57', color: 'white'}}
                onClick={() => navigate('/checkout')} >CHECKOUT</button>
                <button style={{ color: '#3B1E57' }} className='button' onClick={() => clearCart()}>CLEAR</button>
            </div>
        </div>
    )
}

export default Total
