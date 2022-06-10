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
    return (
       
    
    <div> 
       { isLaptop ? <Parallax   bgImage={ HERO } bgImageAlt='hero' >
        <section className="hero is-large ">
           
            <div className="hero-body">
            <h1 className="hero-title">
                   <span className="title-word title-word-1">Crafts </span>
                   <span className="title-word title-word-2">for </span>
                   <span className="title-word title-word-3">Every </span>
                   <span className="title-word title-word-4">Occasion </span>
               </h1>
                <div className="shop-now-btn">
                    <Button 
                        variant='contained'
                        color='secondary'  
                        id='btn-white-outline' 
                        sx={{opacity: '95%', width: '25%', padding: '1rem'}} >
                       <Link  style={{ fontSize: '2rem' }} to={`/shop`}> SHOP NOW </Link>
                    </Button>
                </div>
            </div>
        </section>
        </Parallax> :  <section className="hero is-large is-info hero-image">
           
           <div className="hero-body">
            <div className="title-container">
               <h1 className="hero-title">
                   <span className="title-word title-word-1">Crafts </span>
                   <span className="title-word title-word-2">for </span>
                   <span className="title-word title-word-3">Every </span>
                   <span className="title-word title-word-4">Occasion </span>
               </h1></div>
               <div className="shop-now-btn">
                   <Button color='secondary' variant='contained' id='btn-white-outline' sx={{opacity: '95%', paddingTop: '.5rem !important', paddingBottom: '.25rem !important' }} >
                      <Link style={{ fontSize: '1rem'}} to={`/shop`}> SHOP NOW </Link>
                   </Button>
               </div>
           </div>
       </section> }
    </div>
   
    )
}

export default Hero
