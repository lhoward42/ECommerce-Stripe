import React from "react";
import './hero.styles.scss';

const Hero = () => {
    return (
    <div>
        <section className="hero is-large is-info hero-image">
            <div className="hero-body">
                <h1 className="hero-title">
                    Crafts for Every Occasion 
                </h1>
                <div className="shop-now-btn">
                    <button className="button shop-now" id='shop-now'>
                        SHOP NOW
                    </button>
                </div>
            </div>
        </section>
    </div>
    )
}

export default Hero
