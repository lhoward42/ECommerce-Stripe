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
                <h1 className="hero-title ">
                    Crafts for Every Occasion 
                </h1>
                <div className="shop-now-btn">
                    <Button color='primary' variant='contained' id='btn-white-outline' sx={{opacity: '95%'}} >
                       <Link to={`/shop`}> SHOP NOW </Link>
                    </Button>
                </div>
            </div>
        </section>
        </Parallax> :  <section className="hero is-large is-info hero-image">
           
           <div className="hero-body">
               <h1 className="hero-title">
                   Crafts for Every Occasion 
               </h1>
               <div className="shop-now-btn">
                   <Button color='primary' variant='contained' id='btn-white-outline' sx={{opacity: '95%'}} >
                      <Link to={`/shop`}> SHOP NOW </Link>
                   </Button>
               </div>
           </div>
       </section> }
    </div>
   
    )
}

export default Hero
