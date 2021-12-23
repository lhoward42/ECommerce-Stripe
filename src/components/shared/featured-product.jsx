import React from 'react';
import { Link } from 'react-router-dom';
import './featured-products.styles.scss'


const FeaturedProduct = (product) => {
    const { title, imageUrl, price, id } = product;

    return (
        
        <div className='featured-product'>
            <div className='featured-image'>
                <Link to={`/product/${id}`}>
                <img src={imageUrl} alt='product'/> 
                </Link>
                <div className='name-price'>
                    <h3 className='product-title'>{title}</h3>
                    <p>{price}</p>
                    <button className='button is-black nomad-btn'>ADD TO CART</button> 
                </div>
            </div>
        </div>
       
    )
}

export default FeaturedProduct;