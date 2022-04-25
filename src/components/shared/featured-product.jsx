import React, { useContext, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
import { isInCart } from '../../helpers';
import { CartContext } from '../../context/cart-context';
import { Link } from 'react-router-dom';
import './featured-products.styles.scss'
import { useEffect } from 'react/cjs/react.development';


const FeaturedProduct = (props) => {
    const { title, imageUrl, price, id, description, metadata, value } = props;
    const product = { title, imageUrl, price, id, description, metadata, value };
    const { addProduct, cartItems, increase, addProdWNewAttribute } = useContext(CartContext);
    const itemInCart = isInCart(product, cartItems)
    const [selectedAttribute, setSelectedAttribute ] = useState(null);
    
    // useEffect(() => {
    //     console.log(selectedAttribute);
    // }, [selectedAttribute])
    
    const select = async (e) => {
        await setSelectedAttribute(e.target.value)
        console.log(e.target.value, selectedAttribute);
    }
    const keyValue = (v) => {
        console.log(value.indexOf(v));
      return value.indexOf(v)
    }
    return (
        
        <div className='featured-product'>
            <div className='featured-image'>
                <Link to={`/product/${id}`}>
                <img src={imageUrl} alt='product'/> 
                </Link>
                <div className='name-price'>
                    <h3 className='product-title'>{title}</h3>
                    <p>$ {price}</p>
                    <p>{metadata}</p>
                    
                    <select onChange={(e) => select(e)}>
                        <option value="" disabled selected>Select a Size</option>
                        {value.map(v => <option key={v} value={v}> {v} </option>)}
                    </select>
                    <button 
                        className='button is-black nomad-btn'
                        onClick={() => addProdWNewAttribute(product, selectedAttribute)}>
                            ADD TO CART</button>
            
                    {
                        !itemInCart && (  
                        <button 
                        className='button is-black nomad-btn'
                        onClick={() => addProduct(product, selectedAttribute)}>
                            ADD TO CART</button> ) }
                       { itemInCart && (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={()=> increase(product, selectedAttribute)}>
                            ADD MORE</button> 
                    )}
                   
                </div>
            </div>
        </div>
       
    )
}

export default FeaturedProduct;