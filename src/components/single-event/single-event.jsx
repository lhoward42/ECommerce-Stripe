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
    CardMedia,
    Box,
    Modal
} from '@mui/material'
import Layout from '../shared/layout';
import { DeviceSize } from '../../utils/DeviceSize';
import useMediaQuery from 'react-responsive';
import NestedModal from './child-modal';
import { format } from 'date-fns';

const SingleEvent = () => {
    const { products, MenuProps, setProduct, product } = useContext(ProductsContext);
    const { events, event, setEvent, toStandardTime } = useContext(EventsContext);
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
          const prod = products.filter(item => title === item.eventName);
          const event = events.find(ev => Number(ev.id) === Number(id));
          console.log(prod)
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
      
      const addToCart = (prod) => {
        addProdWAttribute(prod, selectedAttribute, selectedAttribute2, qty)
            
      }
      const updateCart = () => {
        update(product, selectedAttribute, selectedAttribute2, qty);
      }   
      
      return (
          <Layout>
          <Container sx={{ margin: '2rem 0', marginBottom: '3rem', padding: '2rem',
           display: isLaptop && 'flex', justifyContent: isLaptop && 'center',
            alignItems: isLaptop && 'center'}}>
                <CardMedia component='img' image={event.imageUrl} alt='event' sx={{ width: '60%', margin: '2.5rem auto' }} />              <h1>{event.title}</h1>
                {product.map(prod => 
                <div style={{ marginLeft: '1rem'}}><NestedModal {...prod} key={prod.id} qty={qty} setQty={setQty} /> </div>
                )}
              <h2 style={{marginBottom: '0'}}>{format(new Date(date), 'MMM-dd-yy')} </h2><br />
               <p style={{ marginTop: '0'}}> Start Time:  <b> {toStandardTime(startTime)}</b> </p>
               <p>End Time: <b>{toStandardTime(endTime)}</b></p>
            {/*  {format(new Date(date + startTime), 'hh:mm a')} */}
            <h2>Event Info:</h2>
              <p style={{ fontSize: '1.1rem'}}>{event.description}</p>
               {/* select menu for first set of attributes */}
               {/* {  product.map(prod => hasValueAttributes(prod) &&<>  */}
               {/* <NestedModal {...prod} key={prod.id} /> */}
                    {/* <FormControl size="small">
                        <p>{prod.title}</p>
                    <Select
                    sx={{ width: 100, marginTop: '.5rem', margin: '1rem' }} 
                    onChange={select}
                    labelId="demo-multiple-name-label"
                    value={selectedAttribute}
                    MenuProps={MenuProps}
                    >
                        {prod.value !== [] && prod.value.map(v => 
                        <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>
                  </FormControl> </>
               )}
                    */}
                    {/* select menu for second set of attributes */}
                    {/* {product.map(prod => hasValueAttributes2(prod) && 
                    <FormControl size="small">
                    <Select 
                    sx={{ width: 100 }}
                    onChange={select2}
                    labelId="demo-multiple-name-label"
                    value={selectedAttribute2}
                    MenuProps={MenuProps}
                    >
                        {prod.value2 !== null && prod.value2.map(v =>
                         <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>
                 </FormControl>
                    )} */}
                    
               
                    {/* Conditional for product with no attributes */}
                    {/* {product.map(prod => !isInCart(prod, cartItems, "", "") && !hasValueAttributes(prod) ? (   
                        <button 
                        className='button btn-increase nomad-btn'
                        onClick={() => addProdWAttribute(prod, "", "", qty)}>
                            ADD TICKET TO CART</button> 
                    ) : <></> )}
                    {product.map(prod => isInCart(prod, cartItems, "", "") && !hasValueAttributes(prod) ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={() => update(prod, "", "", qty)}>
                            UPDATE TICKET IN CART</button> 
                    ) : <></>
                        )} */}

                        {/* Conditional for product with one attribute */}
                        {/* {product.map(prod => {
                    if(!isInCart(prod, cartItems, selectedAttribute, "")
                    && hasValueAttributes(prod)  && selectedAttribute && !hasValueAttributes2(prod)) { 
                        return (
                        <button 
                        className='button btn-increase nomad-btn'
                        onClick={() => addProdWAttribute(prod, selectedAttribute, "", qty)}>
                            ADD {prod.title} TO CART</button> )
                    } else if ( isInCart(prod, cartItems, selectedAttribute, "") && hasValueAttributes(prod) && !hasValueAttributes2(prod) && selectedAttribute && !hasValueAttributes2(prod)) {
                        return (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={() => update(prod, selectedAttribute, "", qty)}>
                            UPDATE CART
                            </button> 
                        )
                    } else { 
                        return <></>}
                    })
                    } */}
                   
                        {/* Conditional for product with two attributes */}
                        {/* {
                        product.map(prod => !isInCart(prod, cartItems, selectedAttribute, selectedAttribute2) && hasValueAttributes(prod) && selectedAttribute && hasValueAttributes2(prod) && selectedAttribute2 ? (   
                        <button 
                        className='button is-black nomad-btn'
                        onClick={() => addProdWAttribute(prod, selectedAttribute, selectedAttribute2, qty)}>
                            ADD TO {prod.title} CART</button> 
                    ) :
                        <></> )}
                       { 
                       product.map(prod => isInCart(prod, cartItems, selectedAttribute, selectedAttribute2) && hasValueAttributes(prod) && selectedAttribute && hasValueAttributes2(prod) && selectedAttribute2 ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={() => update(prod, selectedAttribute, selectedAttribute2, qty)}>
                            UPDATE CART</button> 
                    ) : 
                        <></>)} */}
                    
              <Button></Button>
              
            </Container>
            </Layout>
      )
         
}

export default SingleEvent