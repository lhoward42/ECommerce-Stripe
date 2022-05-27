import React, { useContext } from 'react'
import { ProductsContext } from '../../context/products-context';
import FeaturedProductHome from '../shared/featured-product-home-page';
import { Grid, Box } from '@mui/material'
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from '../../utils/DeviceSize';

const FeaturedCollection = () => {
    const { products } = useContext(ProductsContext);
    const productItems = products.filter((product, i) => i < 4).map(product => (
       
        <Grid  item xs={8} sm={6} md={3}  >
        <FeaturedProductHome {...product} key={product.id} />
        </Grid>
    )) 


    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    return (
        <>
        <div className="featured-collection container">
            <h2 className="featured-section-title" style={{ textAlign: 'center'}}>Featured Collection</h2>
            <Grid container display="flex" justifyContent="center" sx={{ padding: !isMobile ? '1rem 1.5rem' : 'none'}}>
                {
                    productItems
                }
            </Grid>
        </div>
        </>
    )
}

export default FeaturedCollection
