import React from 'react';
import { useNavigate } from 'react-router-dom'
import HolidayDisplay from '../../assets/HolidayCraftDisplay.jpeg'
import { Button } from '@mui/material'
import './main-section.styles.scss'
import { Link } from 'react-router-dom'


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
                <Button 
                color="secondary" 
                variant="contained"
                
              
                >
                    <Link to={`/product/1`}>
                    MISTLETOE
                    </Link>
                </Button>
                </div>
            </div>
        </div>
    )
}

export default MainSection;
