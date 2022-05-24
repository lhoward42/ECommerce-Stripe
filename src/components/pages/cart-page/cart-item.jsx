import React, { useContext, useState } from 'react'
import { TrashIcon } from '../../icons'
import { Link } from 'react-router-dom';
import { 
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Container,
 } from '@mui/material'

import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { ProductsContext } from '../../../context/products-context';
import { DeviceSize } from '../../../utils/DeviceSize';
import { useMediaQuery } from "react-responsive";


const CartItem = (props) => {
    const { title, imageUrl, price, quantity, update, description, id, removeProduct, metadata  } = props
    const product = { title, imageUrl, price, quantity, id, description, metadata };
    const [qty, setQty] = useState(quantity);
    const { MenuProps } = useContext(ProductsContext)
    const onChangeQty = (e) => {
        setQty(e.target.value);
      };
     
      const populateQuantities = (start, end) => {
        return (
          <FormControl sx={{ width: 100 }}>
          <InputLabel id="demo-multiple-name-label">Qty</InputLabel>
            <Select
              className='select'  
              placeholder='Qty'
              input={<OutlinedInput label="Qty" />}
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

      const updateCart = () => {
         update(product, metadata.property, metadata.property2, qty)
      }

      const remove = () => {
        removeProduct(product, metadata.property, metadata.property2)
        setQty(1)
      }

      const isLaptop = useMediaQuery({ maxWidth: DeviceSize.laptop })
      const isDesktop = useMediaQuery({ maxWidth: DeviceSize.desktop })
    return (
      <div className='cart-item'>
            <div className='item-image'>
            {/* <Link to={`/product/${id}`}> */}
                <img src={imageUrl} alt='event' />
            {/* </Link> */}
            </div>
            <div className='name-price'>
                <h4>{title}</h4>
                {metadata.property !== "" && <p>{metadata.property}</p>}
                {metadata.property2 !== "" && <p>{metadata.property2}</p>}
                <p>$ {(Math.round(price * 100)/100).toFixed(2)}</p>
   
            </div>
            <div className='quantity'>
                   <p>{`Quantity: ${quantity}`}</p>           
                    {populateQuantities(1, 100)}
                   
            </div>
            <Container sx={{ paddingTop: isLaptop ? '20px' ? isDesktop : '30px' : '25px' }}>
                <Button
                sx={{ minHeight: '2.25rem', backgroundColor: '#40fff9ff', color: '#ffc7f1ff', margin: '.2rem 2px'}}
                 onClick={updateCart}>
                    Update Qty 
                </Button>
                
                    <Button
                    sx={{ minHeight: '2.25rem', backgroundColor: '#f7f063ff', color: '#3b1e57ff', margin: '.2rem 2px'}}
                    onClick={remove}
                    >
                        <TrashIcon width='20px' />
                    </Button>
                
              
            </Container>
            </div>
    )
}

export default CartItem
