import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsContext } from '../../context/products-context';
import { isInCart, hasValueAttributes, hasValueAttributes2 } from '../../helpers';
import { CartContext } from '../../context/cart-context';
import Layout from '../shared/layout';
import './single-product.styles.scss';

 const SingleProduct = () => {
    const { products } = useContext(ProductsContext);
    const { addProdWAttribute, cartItems, increase } = useContext(CartContext)
    const navigate = useNavigate();  
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedAttribute, setSelectedAttribute ] = useState(null);
    const [selectedAttribute2, setSelectedAttribute2 ] = useState(null);
    const [qty, setQty] = useState(1);
    
    const token = localStorage.getItem("token");
    
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

    const { imageUrl, title, price, description, property, value, value2, property2 } = product;
    const itemInCart = isInCart(product, cartItems, selectedAttribute, selectedAttribute2);
    const hasValues = hasValueAttributes(product);
    const hasMoreValues = hasValueAttributes2(product);      

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
            
            
            <p>{value.map(v => <p> {v} </p>)}</p>
            
          </div>
          <div className='add-to-cart-btns'>
            {
              !itemInCart &&
              <button 
                className='button is-white nomad-btn' 
                id='btn-white-outline'
                onClick={() => addProdWAttribute(product)}
                >
                  ADD TO CART
              </button> 
            }
            {
              itemInCart &&
              <>
              <button 
                className='button is-white nomad-btn' 
                id='btn-white-outline'
                onClick={() => increase(product)}
                >
                
                  ADD MORE
              </button>
              <button className='button is-black nomad-btn' id='btn-white-outline'>
              PROCEED TO CHECKOUT
            </button>
            </>
            }
           
            
            
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
