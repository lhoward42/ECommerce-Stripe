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
       
    
    <div style={{ backgroundColor: 'rgba(64, 255, 249, .3)', paddingBottom: isLaptop && '1.5rem', paddingTop: isLaptop && '2rem', paddingLeft: isLaptop && '1rem', paddingRight: isLaptop && '1rem' }}> 
       { isLaptop ? <Parallax style={{ width: '100%', height:'100%', marginTop: '2.5rem', marginLeft: 'auto', marginRight: 'auto' }} bgImage={ HERO } bgImageAlt='hero' >
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
                        color='success'  
                        id='btn-white-outline' 
                        sx={{opacity: '95%', width: '25%', padding: '1rem', }} >
                       <Link  style={{ fontSize: '2rem', color: '#3B1E57',}} to={`/shop`}> SHOP NOW </Link>
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
                   <Button color='secondary' className="shop-now-btn" variant='contained'  sx={{opacity: '95%', }} >
                      <Link style={{ fontSize: '1rem'}} to={`/shop`}> SHOP NOW </Link>
                   </Button>
               </div>
           </div>
       </section> }
    </div>
   
    )
}

export default Hero
