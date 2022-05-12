import React, { useContext, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
import { isInCart, hasValueAttributes, hasValueAttributes2 } from '../../helpers';
import { CartContext } from '../../context/cart-context';
import { Link } from 'react-router-dom';
import './featured-products.styles.scss'

const FeaturedProduct = (props) => {
    const { title, imageUrl, price, id, description, metadata, value, property, value2, property2, category } = props;
    const product = { title, imageUrl, price, id, description, metadata, value, property, value2, property2, category };
    const { cartItems, update, addProdWAttribute } = useContext(CartContext);
    const [selectedAttribute, setSelectedAttribute ] = useState(null);
    const [selectedAttribute2, setSelectedAttribute2 ] = useState(null);
    const [qty, setQty] = useState(1);
    const itemInCart = isInCart(product, cartItems, selectedAttribute, selectedAttribute2);
    const token = localStorage.getItem("token");
    const hasValues = hasValueAttributes(product);
    const hasMoreValues = hasValueAttributes2(product);
    
    const select = async (e) => {
        //this needs a switch case for metadata 1 and 2
        await setSelectedAttribute(e.target.value)
        console.log(e.target.value, selectedAttribute);
    }
    const select2 = async (e) => {
        //this needs a switch case for metadata 1 and 2
        await setSelectedAttribute2(e.target.value);
        console.log(e.target.value, selectedAttribute2);
    }  
     
    const addToCart = () => {
        addProdWAttribute(product, selectedAttribute, selectedAttribute2, qty);
            
    }
    const updateCart = () => {
        update(product, selectedAttribute, selectedAttribute2, qty);
    }
      
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
                    {" "}
                    {start + idx}{" "}
                  </option>
                ))}
            </select>
          </>
        );
      };
    return (
        
        <div className='featured-product'>
            <div className='featured-image'>
                { token ? 
                <div className="btns-container"> 
                {/* import update component in here and the navigation method for react-router 6 */}
                    <Link className='btn-increase' to={`/update-product/${id}`}>Edit</Link>
                    </div> 
                    : 
                    <></>
                    }
                    <p>{category}</p>
                <Link to={`/product/${id}`}>
                <img src={imageUrl} alt='product'/> 
                </Link> 
                <div className='name-price'>
                    <h3 className='product-title'>{title}</h3>
                    <p>$ {price}</p>
                <div>
                    {populateQuantities(1, 100)}
                </div>
                     {/* select menu for first set of attributes */}
                    { hasValues && 
                    <select onChange={(e) => select(e)}>
                        <option disabled selected>Select a size</option>
                        {value !== null && value.map(v => <option key={v} value={v}> {v} </option>)}
                    </select>}
                    {/* select menu for second set of attributes */}
                    { hasMoreValues && 
                    <select onChange={(e) => select2(e)}>
                        <option disabled selected>Select a size</option>
                        {value2 !== null && value2.map(v => <option key={v} value={v}> {v} </option>)}
                    </select>}
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
                            UPDATE CART</button> 
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
                            UPDATE CART</button> 
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
                            UPDATE CART</button> 
                    ) : 
                        <></>}
                   
                </div>
            </div>
        </div>
       
    )
}

export default FeaturedProduct;