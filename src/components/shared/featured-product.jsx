import React, { useContext, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
import { isInCart, hasValueAttributes, hasValueAttributes2 } from '../../helpers';
import { CartContext } from '../../context/cart-context';
import { Link } from 'react-router-dom';
import './featured-products.styles.scss'
import { useEffect } from 'react/cjs/react.development';


const FeaturedProduct = (props) => {
    const { title, imageUrl, price, id, description, metadata, value, property, value2, property2 } = props;
    const product = { title, imageUrl, price, id, description, metadata, value, property, value2, property2 };
    const { addProduct, cartItems, increase, addProdWAttribute } = useContext(CartContext);
    const [selectedAttribute, setSelectedAttribute ] = useState(null);
    const itemInCart = isInCart(product, cartItems, selectedAttribute)
    const hasValues = hasValueAttributes(product)
    const hasMoreValues = hasValueAttributes(product)
    // useEffect(() => {
    //     console.log(selectedAttribute);
    // }, [selectedAttribute])
    
    const select = async (e) => {
        //this needs a switch case for metadata 1 and 2
        await setSelectedAttribute(e.target.value)
        console.log(e.target.value, selectedAttribute);
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
                     
                    { hasValues && 
                    <select onChange={(e) => select(e)}>
                        <option value="" disabled selected>Select a Size</option>
                        {value.map(v => <option key={v} value={v}> {v} </option>)}
                    </select>}
                    { hasMoreValues && 
                    <select onChange={(e) => select(e)}>
                        <option value="" disabled selected>Select a {product.property}</option>
                        {value.map(v => <option key={v} value={v}> {v} </option>)}
                    </select>}

                    {!itemInCart && !hasValues ? (   
                        <button 
                        className='button is-black nomad-btn'
                        onClick={() => addProduct(product, selectedAttribute)}>
                            ADD TO CART</button> 
                    ) : itemInCart && !hasValues ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={()=> increase(product, selectedAttribute)}>
                            ADD MORE</button> 
                    ) : <></>
                        }
            
                    {
                        !itemInCart && hasValues && selectedAttribute !== null ? (   
                        <button 
                        className='button is-black nomad-btn'
                        onClick={() => addProdWAttribute(product, selectedAttribute)}>
                            ADD TO CART</button> 
                        ) : <></> }
                       { itemInCart && hasValues ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={()=> increase(product, selectedAttribute)}>
                            ADD MORE</button> 
                    ) : <></>}
                   
                </div>
            </div>
        </div>
       
    )
}

export default FeaturedProduct;