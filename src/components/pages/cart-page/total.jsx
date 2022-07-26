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
                style={{ background: '#3B1E57', color: 'white', padding: isTablet ? '1.5rem 2.15rem': '1.1rem 1.4rem', font: 'inherit', fontSize: '1.1rem' }}
                onClick={() => navigate('/checkout')} >CHECKOUT</button>
                <button style={{ color: '#3B1E57', padding: isTablet ? '1.5rem 3.35rem' : '.75rem 2.55rem', marginBottom: isTablet && '2rem', font: 'inherit', fontSize: '1.1rem' }} className='button' onClick={() => clearCart()}>CLEAR</button>
            </div>
        </div>
    )
}

export default Total
