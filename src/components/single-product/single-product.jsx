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
import { useTheme } from '@mui/material/styles';
import './single-product.styles.scss';

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
            <h3>{title}</h3>
            <p>$ {price}</p>
            <p>{populateQuantities(1, 100)}</p>
            { hasValues && 
                    <Select 
                    onChange={(e) => select(e)}
                    >
                        {value !== null && value.map(v => <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>}
            { hasMoreValues && 
                    <Select onChange={(e) => select2(e)}>
                        
                        {value2 !== null && value2.map(v => <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>}  
          </div>
         
          <div className='add-to-cart-btns'>

          {/* Conditional for product with no attributes */}
          {!itemInCart && !hasValues ? (   
                        <button 
                        className='button is-black nomad-btn'
                        onClick={addToCart}>
                            ADD TO CART</button> 
                    ) : itemInCart && !hasValues ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            ADD MORE</button> 
                    ) : <></>
                        }

          {/* Conditional for product with one attribute */}
          {
                        !itemInCart && hasValues && selectedAttribute && !hasMoreValues ? (   
                        <button 
                        className='button is-black nomad-btn'
                        onClick={addToCart}>
                            ADD TO CART</button> 
                    ) :
                        <></> }
                       { itemInCart && hasValues && !hasMoreValues && selectedAttribute && !hasMoreValues ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            ADD MORE</button> 
                    ) :                
                        <></>}

          {/* Conditional for product with two attributes */}
          {
                        !itemInCart && hasValues && selectedAttribute && hasMoreValues && selectedAttribute2 ? (   
                        <button 
                        className='button is-black nomad-btn'
                        onClick={addToCart}>
                            ADD TO CART</button> 
                    ) :
                        <></> }
                       { 
                       itemInCart && hasValues && hasMoreValues && selectedAttribute && hasMoreValues && selectedAttribute2 ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            ADD MORE</button> 
                    ) : 
                        <></>}
                   

          </div>
          <div className='product-description'>
            <p>
              { description }
            </p>
            
          </div>
        </div>
      </div>
    </Layout>
    )
}

export default SingleProduct
