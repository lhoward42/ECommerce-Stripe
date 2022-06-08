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
  Card
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
      const isLaptopMin = useMediaQuery({ minWidth: DeviceSize.laptop })
      const isLaptop2Min = useMediaQuery({ minWidth: DeviceSize.laptop2 })
      const isTabletMin = useMediaQuery({ minWidth: DeviceSize.tablet })
      const isDesktop = useMediaQuery({ maxWidth: DeviceSize.desktop })
    return (
      <Card className='cart-item' sx={{  background:'linear-gradient(180deg, rgba(255,216,196,0.7077424719887955) 6%, rgba(255,212,207,0.9150253851540616) 66%, rgba(255,212,209,0.9430365896358543) 74%, rgba(255,211,210,0.9066220238095238) 80%, rgba(255,209,216,1) 84%, rgba(255,206,224,0.9122242647058824) 86%, rgba(255,199,241,0.9682466736694678) 90%, rgba(255,199,241,0.8618040966386554) 96%, rgba(255,204,228,0.8982186624649859) 99%, rgba(255,216,197,0.9374343487394958) 100%)', color:  '#3b1e57', opacity: '92%'}}>
            <div className='item-image'>
            {/* <Link to={`/product/${id}`}> */}
                <img src={imageUrl} alt='product' />
            {/* </Link> */}
            </div>
            <div className='name-price'>
                <h4>{title}</h4>
                {metadata.property !== "" && <p>{metadata.property}</p>}
                {metadata.property2 !== "" && <p>{metadata.property2}</p>}
                <p><b>$ {(Math.round(price * 100)/100).toFixed(2)}</b></p>
   
            </div>
            <div>
                   <p className='quantity'>{`Quantity: ${quantity}`}</p>           
                    {populateQuantities(1, 100)}
                   
            </div>
            <Container sx={{ paddingTop: isLaptop ? '20px' : isDesktop ? '30px' : '25px' }}>
                <Button
                color='primary'
                variant='contained'
                id='btn-white-outline'
                sx={{ minHeight: '2.25rem', margin: '.2rem 2px' }}
                 onClick={updateCart}>
                    Update Qty 
                </Button>
                
                    <Button
                    color='secondary'
                    variant='contained'
                    id='btn-white-outline'
                    sx={{ minHeight: '2.25rem', backgroundColor: '#f7f063ff', color: '#3b1e57ff', margin: '.2rem 2px' }}
                    onClick={remove}
                    >
                        <TrashIcon width='1.75rem' />
                    </Button>
                
              
            </Container>
            </Card>
    )
}

export default CartItem
