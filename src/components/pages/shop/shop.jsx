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
        <Grid item xs={8} sm={6} md={4} spacing={1}>
        <FeaturedProduct {...product } key={product.id} />
        </Grid>
    ))

    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
      const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet})
    return (
    <Layout>
        <Grid container display="flex" justifyContent="center" sx={{ padding: !isMobile ? '1rem 1.5rem' : 'none' }}>
            {/* <h2 className='product-list-title'>Shop</h2> */}
            
                {
                    allProducts
                }
            </Grid>
           
   
    </Layout>
    )
}

export default Shop;
