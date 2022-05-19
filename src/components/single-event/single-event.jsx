import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsContext } from '../../context/products-context';
import { isInCart, hasValueAttributes, hasValueAttributes2 } from '../../helpers';
import { CartContext } from '../../context/cart-context';
import { EventsContext } from '../../context/events-context';
import { 
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Container,
    Button,
    CardMedia
} from '@mui/material'
import Layout from '../shared/layout';
import { DeviceSize } from '../../utils/DeviceSize';
import useMediaQuery from 'react-responsive'

const SingleEvent = () => {
    const { products, MenuProps, setProduct, product } = useContext(ProductsContext);
    const { events, event, setEvent } = useContext(EventsContext);
    const { addProdWAttribute, cartItems, update } = useContext(CartContext);
    const navigate = useNavigate();  
    const { id, title } = useParams();
   
    const [selectedAttribute, setSelectedAttribute ] = useState(null);
    const [selectedAttribute2, setSelectedAttribute2 ] = useState(null);
    const [qty, setQty] = useState(1);

    const onChangeQty = (e) => {
        setQty(e.target.value);
      };

      const populateQuantities = (start, end) => {
        return (
          <FormControl sx={{ width: 100 }}>
          <InputLabel id="demo-multiple-name-label">Qty</InputLabel>
          <Select
            className='select'
            input={<OutlinedInput label="Qty" />}
            placeholder='Qty'
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
      const isLaptop = useMediaQuery({ minWidth: DeviceSize.laptop })
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
          const prod = products.find(item => title === item.eventName);
          const event = events.find(ev => Number(ev.id) === Number(id));
        //   console.log(prod)
          console.log(event);
          console.log(title);
          if(!event) {
              return navigate('/events');
          }
          if(prod) {
              setProduct(prod)
          } else {
              setProduct({})
          }
          setEvent(event);
        //   setProduct(product)
      }, [title, products, events, id, setProduct, setEvent, navigate ])

      if(!event || !product){ return <> ...Page is Loading </> }
      
      
      const { description, date, startTime, endTime, location } = event;
      const { value, value2 } = product;
      console.log(event.value);
      const itemInCart = isInCart(product, cartItems, selectedAttribute, selectedAttribute2);
      const hasValues = hasValueAttributes(product);
      const hasMoreValues = hasValueAttributes2(product);      
      
      const addToCart = () => {
        addProdWAttribute(product, selectedAttribute, selectedAttribute2, qty)
            
      }
      const updateCart = () => {
        update(product, selectedAttribute, selectedAttribute2, qty);
      }   

      return (
          <Layout>
          <Container sx={{ margin: '2rem 0', marginBottom: '3rem', padding: '2rem',
           display: isLaptop && 'flex', justifyContent: isLaptop && 'center',
            alignItems: isLaptop && 'center'}}>
                <CardMedia component='img' image={event.imageUrl} alt='event' sx={{ width: '60%', margin: '2.5rem auto' }} />              <h2>{event.title}</h2>
              {/* <h4>{product.price}</h4> */}
              <p>{event.description}</p>
               {/* select menu for first set of attributes */}
               { hasValues && 
                    <FormControl size="small">
                    <Select
                    sx={{ width: 100, marginTop: '.5rem' }} 
                    onChange={select}
                    labelId="demo-multiple-name-label"
                    value={selectedAttribute}
                    MenuProps={MenuProps}
                    >
                        {value !== [] && value.map(v => 
                        <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>
                  </FormControl>
                    }
                    
                    {/* select menu for second set of attributes */}
                    { hasMoreValues && 
                    <FormControl size="small">
                    <Select 
                    sx={{ width: 100 }}
                    onChange={select2}
                    labelId="demo-multiple-name-label"
                    value={selectedAttribute2}
                    MenuProps={MenuProps}
                    >
                        {value2 !== null && value2.map(v =>
                         <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>
                 </FormControl>
                    }
                    
               
                    {/* Conditional for product with no attributes */}
                    {Object.keys(product).length !== 0 && !itemInCart && !hasValues ? (   
                        <button 
                        className='button btn-increase nomad-btn'
                        onClick={addToCart}>
                            ADD TICKET TO CART</button> 
                    ) : Object.keys(product).length !== 0 && itemInCart && !hasValues ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            UPDATE TICKET IN CART</button> 
                    ) : <></>
                        }

                        {/* Conditional for product with one attribute */}
                        {
                        Object.keys(product).length !== 0 && !itemInCart && hasValues && selectedAttribute && !hasMoreValues ? (   
                        <button 
                        className='button btn-increase nomad-btn'
                        onClick={addToCart}>
                            ADD TO CART</button> 
                    ) :
                        <></> }
                       { Object.keys(product).length !== 0 && itemInCart && hasValues && !hasMoreValues && selectedAttribute && !hasMoreValues ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            UPDATE CART</button> 
                    ) :                
                        <></>}
                   
                        {/* Conditional for product with two attributes */}
                        {
                        Object.keys(product).length !== 0 && !itemInCart && hasValues && selectedAttribute && hasMoreValues && selectedAttribute2 ? (   
                        <button 
                        className='button is-black nomad-btn'
                        onClick={addToCart}>
                            ADD TO CART</button> 
                    ) :
                        <></> }
                       { 
                       Object.keys(product).length !== 0 && itemInCart && hasValues && hasMoreValues && selectedAttribute && hasMoreValues && selectedAttribute2 ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            UPDATE CART</button> 
                    ) : 
                        <></>}
                    
              <Button></Button>
              
            </Container>
            </Layout>
      )
         
}

export default SingleEvent