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
        <Grid item xs={5.8} sm={2.9} md={2.9} sx={{ margin: '0rem .15rem' }}>
        <FeaturedProduct {...product } key={product.id} />
        </Grid>
    ));
    console.log('app products ===', products, allProducts)
    
    const allProductsAdmin = products.map(product => (
        <Grid item xs={5.8} sm={3.85} md={2.5} sx={{ }}>
        <FeaturedProduct {...product } key={product.id} />
        </Grid>
    ))
    console.log("app admin products===", allProductsAdmin);
    let token = localStorage.getItem("token")
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet })
    const isLaptop2 = useMediaQuery({ maxWidth: DeviceSize.laptop2 });
    const isLaptop2Min = useMediaQuery({ minWidth: DeviceSize.laptop2})
    return (
    <Layout>
        <div className='sign-div'><img className='shop-sign' src={ShopSign} alt='shop'/></div>
        {/* <h1 style={{ textAlign: 'center', margin: '2.5rem 2rem 1rem 2rem', fontSize: isMobile ? '3rem': isLaptop2 ? '4rem' : '5rem'}}>Shop</h1> */}
        <div style={{ padding: isMobile ? '.5rem .75rem' : isTablet ? '1rem' : '0rem 1rem' }}>
        <Grid 
        container 
        display="flex" 
        justifyContent="center" 
        sx={{ padding: isMobile ? '.75rem 0rem 0rem .5rem' : isTablet ? '1.5rem 1rem 0rem .75rem' : '2rem 1.5rem 2rem 1.25rem', background: 'rgba(255, 216, 196, .7)', boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px', marginBottom: '1rem'}}
        >
        { token ? allProductsAdmin : allProducts }
            </Grid>
           </div>
   
    </Layout>
    )
}

export default Shop;
