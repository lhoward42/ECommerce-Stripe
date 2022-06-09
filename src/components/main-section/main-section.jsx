import React from 'react';
import { useNavigate } from 'react-router-dom'
import HolidayDisplay from '../../assets/HolidayCraftDisplay.jpeg'
import { Button } from '@mui/material'
import './main-section.styles.scss'
import { Link } from 'react-router-dom'
import {Parallax } from 'react-parallax'
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../../utils/DeviceSize';
const MainSection = () => {
const navigate = useNavigate()
const isLaptop2 = useMediaQuery({ minWidth: DeviceSize.laptop2 })
    return (
        <>
        {isLaptop2 ? <div className='main-section-container'>
            <div className='main-section-middle'> 
            <Parallax style={{ backgroundSize: '100% 100%' }} bgImage={HolidayDisplay} strength={100}>
      <div style={{ height: 550, width: 1000 }}>
       
      </div>
    </Parallax>
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
                    FOR YOU
                    </Link>
                </Button>
                </div>
            </div>
        </div>
    :
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
}
</>
    )
}

export default MainSection;
