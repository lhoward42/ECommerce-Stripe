import React from 'react';
import { useNavigate } from 'react-router-dom'
import HolidayDisplay from '../../assets/HolidayCraftDisplay.jpeg'
import './main-section.styles.scss'


const MainSection = () => {
const navigate = useNavigate()

    return (
        <div className='main-section-container'>
            <div className='main-section-middle'> 
                <div className='ms-m-image'>
                    <img src={HolidayDisplay} alt='holiday-display' />
                </div>
                <div className='ms-m-description'>
                <h2>Handmade pieces crafted with you in mind.</h2>
                <p> Custom pieces carefully crafted with love to bring life to your space. 
                    Celebrate the holidays or celebrate the season, no matter what there's 
                    a crafty piece that will fit right in your space.
                </p>
                <button className='button is-black' id='show-now' onClick={() => navigate('/product/1')}>
                    MISTLETOE
                </button>
                </div>
            </div>
        </div>
    )
}

export default MainSection;
