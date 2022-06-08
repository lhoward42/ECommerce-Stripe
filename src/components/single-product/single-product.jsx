import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsContext } from '../../context/products-context';
import { isInCart, hasValueAttributes, hasValueAttributes2 } from '../../helpers';
import { CartContext } from '../../context/cart-context';
import Layout from '../shared/layout';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './single-product.styles.scss';
import { Button } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../../utils/DeviceSize';


 const SingleProduct = () => {
    const { products, MenuProps } = useContext(ProductsContext);
    const { addProdWAttribute, cartItems, update } = useContext(CartContext)
    const navigate = useNavigate();  
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedAttribute, setSelectedAttribute ] = useState(null);
    const [selectedAttribute2, setSelectedAttribute2 ] = useState(null);
    const [qty, setQty] = useState(1);
    
    
    const onChangeQty = (e) => {
      setQty(e.target.value);
    };
   
    const populateQuantities = (start, end) => {
      return (
        <FormControl sx={{ width: 100 }}>
        <InputLabel id="demo-multiple-name-label">Qty</InputLabel>
        <Select
          className='select'
          input={<OutlinedInput label="Qty" />}
          placeholder='Qty'
          value={qty ? qty : "Qty"}
          onChange={onChangeQty}
          MenuProps={MenuProps}
        >
          {Array(end - start + 1)
            .fill()
            .map((_, idx) => (
              <MenuItem key={start + idx} value={start + idx}>
                {" "}
                {start + idx}{" "}
              </MenuItem>
            ))}
        </Select>
    </FormControl>
      );
    };

    const select = async (e) => {
      //this needs a switch case for metadata 1 and 2
      await setSelectedAttribute(e.target.value)
      console.log(e.target.value, selectedAttribute);
    }
  
    const select2 = async (e) => {
      //this needs a switch case for metadata 1 and 2
      await setSelectedAttribute2(e.target.value)
      console.log(e.target.value, selectedAttribute2);
    }
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isLaptop2 = useMediaQuery({ maxWidth: DeviceSize.laptop2 });
    const isLaptop = useMediaQuery({ minWidth: DeviceSize.laptop2 });

    useEffect(() => {
        const product = products.find(item => Number(item.id) === Number(id));
      
          // if product does not exist, redirect to shop page
        if (!product) {
            return navigate('/shop');
          }
      
          setProduct(product);
        }, [id, navigate, products, product]);

    if (!product) { return null };

    const { imageUrl, title, price, description, value, value2 } = product;
    const itemInCart = isInCart(product, cartItems, selectedAttribute, selectedAttribute2);
    const hasValues = hasValueAttributes(product);
    const hasMoreValues = hasValueAttributes2(product);      
    
    const addToCart = () => {
      addProdWAttribute(product, selectedAttribute, selectedAttribute2, qty)
          
    }
    const updateCart = () => {
      update(product, selectedAttribute, selectedAttribute2, qty);
    }  
    
  
    return (
        <Layout>
      <div className='single-product-container'>
        
        <div className='product-image'>
          <img src={imageUrl} alt='product' />
          
        </div>
        <div className='product-details'>
          <div className='name-price'>
            <h1 style={{ textAlign: isLaptop ? 'start' : 'center'}}>{title}</h1>
            <p>$ {price}</p>
            <p className='populate-quantity'>{populateQuantities(1, 100)}</p>
            { isLaptop ? <Box sx={{ display: 'flex', flexDirection: 'column', margin: isMobile ? '.8rem auto .8rem .5rem' : isLaptop2 ? '.8rem 25rem .8rem .5rem' : '0'}}>
            { hasValues && 
                    <Select 
                    sx={{ marginBottom: '1rem'}}
                    onChange={(e) => select(e)}
                    >
                        {value !== null && value.map(v => <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>}
            { hasMoreValues && 
                    <Select 
                    onChange={(e) => select2(e)}>
                        
                        {value2 !== null && value2.map(v => <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>} 
            </Box> : <> { hasValues && 
                    <Select 
                    sx={{ marginBottom: '1rem', width: '100%' }}
                    onChange={(e) => select(e)}
                    >
                        {value !== null && value.map(v => <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>}
            { hasMoreValues && 
                    <Select 
                    sx={{  width: '100%' }}
                    onChange={(e) => select2(e)}>
                        
                        {value2 !== null && value2.map(v => <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>} </> }
          </div>
         
          <Box sx={{ display: 'flex', justifyContent: isLaptop ? 'start' : 'center' }}>

          {/* Conditional for product with no attributes */}
          {!itemInCart && !hasValues ? (   
                        <Button 
                        className='button  nomad-btn'
                        color='primary'
                        variant='contained'
                        id='btn-white-outline'
                        onClick={addToCart}>
                            ADD TO CART</Button> 
                    ) : itemInCart && !hasValues ? (
                        <Button 
                        className='button nomad-btn'
                        color='secondary'
                        variant='contained'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            UPDATE CART</Button> 
                    ) : <></>
                        }

          {/* Conditional for product with one attribute */}
          {
                        !itemInCart && hasValues && selectedAttribute && !hasMoreValues ? (   
                        <Button 
                        className='button nomad-btn'
                        color='primary'
                        variant='contained'
                        id='btn-white-outline'
                        onClick={addToCart}>
                            ADD TO CART</Button> 
                    ) :
                        <></> }
                       { itemInCart && hasValues && !hasMoreValues && selectedAttribute && !hasMoreValues ? (
                        <Button 
                        className='button  nomad-btn'
                        color='secondary'
                        variant='contained'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            UPDATE CART</Button> 
                    ) :                
                        <></>}

          {/* Conditional for product with two attributes */}
          {
                        !itemInCart && hasValues && selectedAttribute && hasMoreValues && selectedAttribute2 ? (   
                        <Button 
                        className='button nomad-btn'
                        color='primary'
                        variant='contained'
                        id='btn-white-outline'
                        onClick={addToCart}>
                            ADD TO CART</Button> 
                    ) :
                        <></> }
                       { 
                       itemInCart && hasValues && hasMoreValues && selectedAttribute && hasMoreValues && selectedAttribute2 ? (
                        <Button 
                        className='button nomad-btn'
                        color='secondary'
                        variant='contained'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            UPDATE CART</Button> 
                    ) : 
                        <></>}
                   

          </Box>
          <div className='product-description'>
            <h2>
              { description }
            </h2>
            
          </div>
        </div>
      </div>
    </Layout>
    )
}

export default SingleProduct
