import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../shared/layout';
import FeaturedProduct from '../../shared/featured-product';
import  { ProductsContext } from '../../../context/products-context';
import { Grid, Box } from '@mui/material'
import './shop.styles.scss'
import { DeviceSize } from '../../../utils/DeviceSize';
import { useMediaQuery } from "react-responsive";
import ShopSign from '../../../assets/ShopSign.png'

const Shop = () => {
    const { products } = useContext(ProductsContext)
    const allProducts = products.map(product => (
        product.category.includes("product") &&
        <Grid item xs={8} sm={8} md={3} sx={{ }}>
        <FeaturedProduct {...product } key={product.id} />
        </Grid>
    ))
    const allProductsAdmin = products.map(product => (
        <Grid item xs={8} sm={8} md={3} sx={{ }}>
        <FeaturedProduct {...product } key={product.id} />
        </Grid>
    ))
    let token = localStorage.getItem("token")
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet })
    const isLaptop2 = useMediaQuery({ maxWidth: DeviceSize.laptop2 });
    const isLaptop2Min = useMediaQuery({ minWidth: DeviceSize.laptop2})
    return (
    <Layout>
        <div className='sign-div'><img className='shop-sign' src={ShopSign} alt='shop'/></div>
        {/* <h1 style={{ textAlign: 'center', margin: '2.5rem 2rem 1rem 2rem', fontSize: isMobile ? '3rem': isLaptop2 ? '4rem' : '5rem'}}>Shop</h1> */}
        <div style={{ padding: isMobile ? '.5rem 1.5rem' : isTablet ? '1rem 2.5rem' : '2rem 2rem' }}>
        <Grid 
        container 
        display="flex" 
        justifyContent="center" 
        sx={{ padding: isMobile ? '1rem 0' : isTablet ? '1.5rem 1.75rem 0rem 1.25rem' : '2rem 1.75rem 2rem 1.25rem', background: 'rgba(255, 216, 196, .7)'}}
        >
        { token ? allProductsAdmin : allProducts }
            </Grid>
           </div>
   
    </Layout>
    )
}

export default Shop;
