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
    const [selectedAttribute2, setSelectedAttribute2 ] = useState(null);
    const itemInCart = isInCart(product, cartItems, selectedAttribute);
    const token = localStorage.getItem("token")
    const hasValues = hasValueAttributes(product)
    const hasMoreValues = hasValueAttributes2(product)

    // useEffect(() => {
    //     console.log(selectedAttribute);
    // }, [selectedAttribute])
    
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
    
    return (
        
        <div className='featured-product'>
            <div className='featured-image'>
                { token ? 
                <div className="btns-container"> 
                {/* import update component in here and the navigation method for react-router 6 */}
                    <button className="btn-trash" onClick={()=> {}}> X </button> 
                    <Link className='btn-increase' to={`/update-product/${id}`}>Edit</Link>
                    </div> 
                    : 
                    <></>
                    }
                <Link to={`/product/${id}`}>
                <img src={imageUrl} alt='product'/> 
                </Link> 
                <div className='name-price'>
                    <h3 className='product-title'>{title}</h3>
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

                    {!itemInCart && !hasValues ? (   
                        <button 
                        className='button is-black nomad-btn'
                        onClick={() => addProdWAttribute(product, selectedAttribute)}>
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
                        !itemInCart && hasValues && selectedAttribute && !hasMoreValues ? (   
                        <button 
                        className='button is-black nomad-btn'
                        onClick={() => addProdWAttribute(product, selectedAttribute)}>
                            ADD TO CART</button> 
                        ) : <></> }
                       { itemInCart && hasValues && !hasMoreValues && selectedAttribute && !hasMoreValues ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={()=> increase(product, selectedAttribute)}>
                            ADD MORE</button> 
                    ) : <></>}
                   

                   {
                        !itemInCart && hasValues && selectedAttribute && hasMoreValues && selectedAttribute2 ? (   
                        <button 
                        className='button is-black nomad-btn'
                        onClick={() => addProdWAttribute(product, selectedAttribute, selectedAttribute2)}>
                            ADD TO CART</button> 
                        ) : <></> }
                       { itemInCart && hasValues && hasMoreValues && selectedAttribute && hasMoreValues && selectedAttribute2 ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={()=> increase(product, selectedAttribute, selectedAttribute2)}>
                            ADD MORE</button> 
                    ) : <></>}
                   
                </div>
            </div>
        </div>
       
    )
}

export default FeaturedProduct;