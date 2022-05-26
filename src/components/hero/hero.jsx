import React from "react";
import './hero.styles.scss';
import { Button } from "@mui/material";

const Hero = () => {
    return (
    <div>
        <section className="hero is-large is-info hero-image">
            <div className="hero-body">
                <h1 className="hero-title">
                    Crafts for Every Occasion 
                </h1>
                <div className="shop-now-btn">
                    <Button color='primary' variant='contained' sx={{opacity: '95%'}} >
                        SHOP NOW
                    </Button>
                </div>
            </div>
        </section>
    </div>
    )
}

export default Hero
