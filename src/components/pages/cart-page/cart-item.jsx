import React, { useState } from 'react'
import { TrashIcon } from '../../icons'
import { Link } from 'react-router-dom';

const CartItem = (props) => {
    const { title, imageUrl, price, quantity, update, description, id, removeProduct, metadata  } = props
    const product = { title, imageUrl, price, quantity, id, description, metadata };
    const [qty, setQty] = useState(quantity);

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

      const updateCart = () => {
         update(product, metadata.property, metadata.property2, qty)
      }

      const remove = () => {
        removeProduct(product, metadata.property, metadata.property2)
        setQty(1)
      }

    return (
        <div className='cart-item'>
            <div className='item-image'>
            {/* <Link to={`/product/${id}`}> */}
                <img src={imageUrl} alt='product' />
            {/* </Link> */}
            </div>
            <div className='name-price'>
                <h4>{title}</h4>
                {metadata.property !== "" && <p>{metadata.property}</p>}
                {metadata.property2 !== "" && <p>{metadata.property2}</p>}
                <p>$ {price}</p>
   
            </div>
            <div className='quantity'>
                   <p>{`Quantity: ${quantity}`}</p>           
                    {populateQuantities(1, 100)}
                   
            </div>
            <div className='btns-container'>
                <button
                className='btn-increase' onClick={updateCart}>
                    Update Qty 
                </button>
                
                    <button
                    className='btn-trash' onClick={remove}>
                        <TrashIcon width='20px' />
                    </button>
                
              
            </div>
        </div>
    )
}

export default CartItem
