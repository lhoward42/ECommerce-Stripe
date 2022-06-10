import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../../../utils/DeviceSize';




const Total = ({ itemCount, total, clearCart }) => {
    const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet })
    const navigate = useNavigate()
    return (
        <div className='total-container'>
            <div style={{ margin: '2rem'}}>
                <p>Total Items: <b>{itemCount}</b></p>
                <p>Total:<b>{` $${(Math.round(total * 100)/100).toFixed(2)} `}</b></p>
            </div>            
            <div className='checkout'>
                <button className='button' 
                style={{ background: '#3B1E57', color: 'white'}}
                onClick={() => navigate('/checkout')} >CHECKOUT</button>
                <button style={{ color: '#3B1E57', padding: '.75rem 2.1rem', marginBottom: isTablet && '2rem', }} className='button' onClick={() => clearCart()}>CLEAR</button>
            </div>
        </div>
    )
}

export default Total
