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
    
    const onChangeQty = (e) => {
      setQty(e.target.value);
    };
   
    const populateQuantities = (start, end) => {
      return (
        <>
          <select
            className='select'
            
            placeholder='Qty'
            value={qty ? qty : "Qty"}
            onChange={onChangeQty}
          >
            {Array(end - start + 1)
              .fill()
              .map((_, idx) => (
                <option key={start + idx} value={start + idx}>
                
                  {start + idx}
                </option>
              ))}
          </select>
        </>
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

    const { imageUrl, title, price, description, property, value, value2, property2 } = product;
    const itemInCart = isInCart(product, cartItems, selectedAttribute, selectedAttribute2);
    const hasValues = hasValueAttributes(product);
    const hasMoreValues = hasValueAttributes2(product);      
    
    const addToCart = () => {
      addProdWAttribute(product, selectedAttribute, selectedAttribute2, qty)
          
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
            { hasValues && 
                    <select onChange={(e) => select(e)}>
                        <option disabled selected>Select a size</option>
                        {value !== null && value.map(v => <option key={v} value={v}> {v} </option>)}
                    </select>}
            { hasMoreValues && 
                    <select onChange={(e) => select2(e)}>
                        <option disabled selected>Select a size</option>
                        {value2 !== null && value2.map(v => <option key={v} value={v}> {v} </option>)}
                    </select>}
            <p>{value.map(v => <p> {v} </p>)}</p>
            <p>{populateQuantities(1, 100)}</p>
          </div>
          <div className='add-to-cart-btns'>
            {/* {
              !itemInCart &&
              <button 
                className='button is-white nomad-btn' 
                id='btn-white-outline'
                onClick={addToCart}
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
           
            
             */}
          </div>
          <div className='add-to-cart-btns'>

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
