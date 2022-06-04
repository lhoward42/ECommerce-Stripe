import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../shared/layout';
import FeaturedProduct from '../../shared/featured-product';
import  { ProductsContext } from '../../../context/products-context';
import { Grid, Box } from '@mui/material'
import './shop.styles.scss'
import { DeviceSize } from '../../../utils/DeviceSize';
import { useMediaQuery } from "react-responsive";

const Shop = () => {
    const { products } = useContext(ProductsContext)
    const allProducts = products.map(product => (
        product.category.includes("product") &&
        <Grid item xs={8} sm={6} md={4} >
        <FeaturedProduct {...product } key={product.id} />
        </Grid>
    ))

    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
     
    return (
    <Layout>
        <h1 style={{ textAlign: 'center', margin: '2.5rem 2rem .5rem 2rem', fontSize: '3rem'}}>Shop</h1>
        <Grid 
        container 
        display="flex" 
        justifyContent="center" 
        sx={{ padding: !isMobile ? '1rem 1.5rem' : 'none' }}
        >
            
            
                {
                    allProducts
                }
            </Grid>
           
   
    </Layout>
    )
}

export default Shop;
