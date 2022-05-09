import React from 'react'
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../../icons'

const CartItem = (props) => {
    const { title, imageUrl, price, quantity, increase, description, id, decrease, removeProduct, metadata, metadata2 } = props
    const product = { title, imageUrl, price, quantity, id, description, metadata, metadata2 };
    return (
        <div className='cart-item'>
            <div className='item-image'>
                <img src={imageUrl} alt='product' />
            </div>
            <div className='name-price'>
                <h4>{title}</h4>
                {metadata.property !== "" && <p>{metadata.property}</p>}
                <p>$ {price}</p>
                
            </div>
            <div className='quantity'>
                <p>{`Quantity: ${quantity}`}</p>
            </div>
            <div className='btns-container'>
                <button
                className='btn-increase' onClick={() => increase(product, metadata.property, metadata.property2)}>
                    <PlusCircleIcon width='20px' />
                </button>
                {
                    quantity === 1 && 
                    <button
                    className='btn-trash' onClick={() => removeProduct(product, metadata.property, metadata.property2)}>
                        <TrashIcon width='20px' />
                    </button>
                }
                {
                    quantity > 1 && 
                    <button 
                    className='btn-decrease' onClick={() => decrease(product, metadata.property, metadata.property2)}>
                        <MinusCircleIcon width='20px' />
                    </button>
                }
            </div>
        </div>
    )
}

export default CartItem
