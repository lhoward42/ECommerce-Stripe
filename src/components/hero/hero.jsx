import React from "react";
import './hero.styles.scss';
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import HERO from '../../assets/CMADHero.jpeg'

const Hero = () => {
    
    return (
       
    
    <div> 
        <Parallax>
        <section className="hero is-large is-info hero-image">
           
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
        </section></Parallax> 
    </div>
   
    )
}

export default Hero
