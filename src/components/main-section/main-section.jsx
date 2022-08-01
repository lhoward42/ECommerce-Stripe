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
const isLaptop = useMediaQuery({ minWidth: DeviceSize.laptop })
const isLaptop2 = useMediaQuery({ minWidth: DeviceSize.laptop2 })
    return (
        <>
        {isLaptop2 ? <div className='main-section-container'>
            <div className='main-section-middle'> 
            <Parallax style={{ backgroundSize: '100% 100%' }} bgImage={HolidayDisplay} strength={100}>
      <div style={{ height: isLaptop ? '45rem' : '40rem', width: '85rem' }}>
       
      </div>
    </Parallax>
                <div className='ms-m-description'>
                <h2 style={{ fontSize: "2rem" }}>Handmade pieces crafted with you in mind.</h2>
                <p style ={{ fontSize: "1.5rem" }}> Custom pieces carefully crafted with love to bring life to your space. 
                    Celebrate the holidays or celebrate the season, no matter what there's 
                    a crafty piece that will fit right in your space.
                </p>
                <Button 
                color="secondary" 
                variant="contained"
                sx={{ padding: ".75rem 2rem"}}
              
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
            <div className='main-section-middle' style={{ boxShadow: "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px"}}> 
                <div className='ms-m-image'>
                    <img src={HolidayDisplay} alt='holiday-display' />
                </div>
                <div className='ms-m-description'>
                <h2 style={{ fontSize: "2rem", margin: '.5rem 0px 0px' }}>Handmade pieces crafted with you in mind.</h2>
                <p style={{ fontSize: "1.5rem", marginTop: '1rem' }}> Custom pieces carefully crafted with love to bring life to your space. 
                    Celebrate the holidays or celebrate the season, no matter what there's 
                    a crafty piece that will fit right in your space.
                </p>
                <Button 
                color="secondary" 
                variant="contained"
                sx={{ padding: '.5rem 2rem .5rem !important', margin: '0rem 0rem 1rem 0rem', border: '1px solid rgba(59, 30, 87, .1)',}}
              
                >
                    <Link style={{ fontSize: '1.25rem'}} to={`/product/1`}>
                    FOR YOU
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
