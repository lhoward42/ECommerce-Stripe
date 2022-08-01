import React from "react";
import './hero.styles.scss';
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import HERO from '../../assets/CMADHero.jpeg'
import { DeviceSize } from '../../utils/DeviceSize';
import { useMediaQuery } from 'react-responsive';
const Hero = () => {
    const isLaptop = useMediaQuery({ minWidth: DeviceSize.laptop2 })
    const isTablet = useMediaQuery({ minWidth: DeviceSize.tablet })
    return (
       
    
    <div style={{}}> 
       { isLaptop ? <Parallax style={{ width: '100%', height:'100%', marginLeft: 'auto', marginRight: 'auto' }}  bgImage={ HERO } bgImageAlt='hero' >
        <section className="hero is-large ">
           
            <div className="hero-body">
            <h1 className="hero-title animate-character">
                Crafts For Every Occasion
                   {/* <span className="title-word title-word-1">Crafts </span>
                   <span className="title-word title-word-2">for </span>
                   <span className="title-word title-word-3">Every </span>
                   <span className="title-word title-word-4">Occasion </span> */}
               </h1>
                <div className="shop-now-btn">
                    {/* <Button 
                        variant='contained'
                        color='success' 
        
                        // id='btn-white-outline' 
                        sx={{opacity: '95%', width: '25%', padding: '1rem', backgroundColor: 'rgba(64,255,249,.9)' }} > */}
                       <Link className="shop-link" style={{ boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px !important', opacity: '99%', width: '25%', padding: '1.2rem 2.6rem', backgroundColor: 'rgba(64,255,249,.9)', fontSize: '2rem', fontWeight: 'bold', borderRadius: '4px' }} to={`/shop`}> SHOP NOW </Link>
                    {/* </Button> */}
                </div>
            </div>
        </section>
        </Parallax> :  <section className="hero is-large hero-image">
           
           <div className="hero-body">
            <div className="title-container">
               <h1 className="hero-title animate-character">
                Crafts For Every Occasion
                   {/* <span className="title-word title-word-1">Crafts </span>
                   <span className="title-word title-word-2">for </span>
                   <span className="title-word title-word-3">Every </span>
                   <span className="title-word title-word-4">Occasion </span> */}
               </h1></div>
               <div className="shop-now-btn">
                   <Button color='secondary' className="shop-now-btn" variant='contained'  sx={{ opacity: 'none !important', backgroundColor: 'rgba(64,255,249,.83)', border: '1px solid rgba(59, 30, 87, .1)' }} >
                      <Link style={{ fontSize: '.8rem'}} to={`/shop`}> SHOP NOW </Link>
                   </Button>
               </div>
           </div>
       </section> }
    </div>
   
    )
}

export default Hero
