import React, { useContext, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
import { isInCart, hasValueAttributes, hasValueAttributes2 } from '../../helpers';
import { CartContext } from '../../context/cart-context';
import { Link } from 'react-router-dom';
import './featured-products.styles.scss';
import { useMediaQuery } from "react-responsive";
import { ProductsContext } from '../../context/products-context';
import { 
    OutlinedInput, 
    InputLabel, 
    MenuItem, 
    FormControl, 
    Box, 
    Select, 
    Card, 
    CardActions, 
    CardContent, 
    Button, 
    Typography,
    CardMedia,
    
  }  from '@mui/material/'
  import { DeviceSize } from '../../utils/DeviceSize';
  // import { useMediaQuery } from "react-responsive";
import { format } from 'date-fns';
import { mdiBorderColor } from '@mdi/js';


const FeaturedProduct = (props) => {
    const { title, imageUrl, price, id, description, metadata, value, property, value2, property2, category } = props;
    const product = { title, imageUrl, price, id, description, metadata, value, property, value2, property2, category };
    const { cartItems, update, addProdWAttribute } = useContext(CartContext);
    const [selectedAttribute, setSelectedAttribute ] = useState("");
    const [selectedAttribute2, setSelectedAttribute2 ] = useState("");
    const [qty, setQty] = useState(1);
    const itemInCart = isInCart(product, cartItems, selectedAttribute, selectedAttribute2);
    const { MenuProps } = useContext(ProductsContext);
    const token = localStorage.getItem("token");
    const hasValues = hasValueAttributes(product);
    const hasMoreValues = hasValueAttributes2(product);
    const date = format(new Date(2022, 11, 16), 'yyyy-MM-dd');
    
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
           <FormControl size="small">
            <Select
              className='select'
              sx={{ border: '1px solid', borderColor: 'rgba(59, 30, 87, .5)'}}
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
      
      const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
      const isLaptop = useMediaQuery({ maxWidth: DeviceSize.laptop });

    return (
        
        <Card className="featured-card" sx={{ background:'linear-gradient(180deg, rgba(255,216,196,0.7077424719887955) 6%, rgba(255,212,207,0.9150253851540616) 66%, rgba(255,212,209,0.9430365896358543) 74%, rgba(255,211,210,0.9066220238095238) 80%, rgba(255,209,216,1) 84%, rgba(255,206,224,0.9122242647058824) 86%, rgba(255,199,241,0.9682466736694678) 90%, rgba(255,199,241,0.8618040966386554) 96%, rgba(255,204,228,0.8982186624649859) 99%, rgba(255,216,197,0.9374343487394958) 100%)', color: '#3B1E57', margin: '.5rem', minWidth: isMobile ? "100%" : " 50%", minHeight: isMobile ? '40rem' : isLaptop ? '53rem' :'66.5rem',  }}>
            <CardContent className='featured-image' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem',}}>
                { token ? 
                <div className="container"> 
                {/* import update component in here and the navigation method for react-router 6 */}
                    <Link className='btn-increase' to={`/update-product/${id}`}>Edit</Link>
                    </div> 
                    : 
                    <></>
                    }
                    
               
                <Link to={`/product/${id}`}>
                <CardMedia 
                sx={{objectFit: 'cover', maxWidth: '40rem', maxHeight: '35rem', marginBottom: '1rem'}}
                component='img'
                image={imageUrl} 
                alt='product'
                /> 
                </Link> 
              
                
                <Typography sx={{ textAlign: 'center', font: 'inherit', fontSize: '2rem', fontWeight: 'bold' }} variant="h1" >{title}</Typography>
                <Typography sx={{ fontSize: '1.4rem', fontFamily: 'inherit', fontWeight: '550'}} variant='h2'>$ {price}</Typography >    
                {/* </div> */}
                <InputLabel id="demo-multiple-name-label">Qty</InputLabel>
                {populateQuantities(1, 100)}
                
                
                     {/* select menu for first set of attributes */}
                    { hasValues && 
                    <FormControl size={isMobile ? "small" : "medium" }  sx={{ margin: '.5rem' }}>
                    <Select
                    sx={{ width: isMobile ? 170 : 260, marginTop: '.5rem', border: '1px solid', borderColor: 'rgba(59, 30, 87, .5)' }} 
                    onChange={select}
                    labelId="demo-multiple-name-label"
                    value={selectedAttribute}
                    MenuProps={MenuProps}
                    >
                        {value !== null && value.map(v => 
                        <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>
                  </FormControl>
                    }
                    
                    {/* select menu for second set of attributes */}
                    { hasMoreValues && 
                    <FormControl size={isMobile ? "small" : "medium" } sx={{ margin: '1rem' }} >
                    <Select 
                    sx={{ width: isMobile ? 170 : 260, border: '1px solid', borderColor: 'rgba(59, 30, 87, .5)' }}
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
                    {!itemInCart && !hasValues ? (   
                        <Button 
                        variant='contained'
                        color='primary' 
                        sx={{ width: isMobile ? 175 : 245, marginTop: '2.5rem'}}
                        className='button btn-increase width nomad-btn'
                        id='btn-white-outline'
                        onClick={addToCart}>
                            ADD TO CART</Button> 
                    ) : itemInCart && !hasValues ? (
                        <Button
                        variant='contained'
                        color='secondary'
                        sx={{ width: isMobile ? 175 : 245, marginTop: '2.5rem'}}
                        className='button btn-increase width nomad-btn'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            UPDATE CART</Button> 
                    ) : <></>
                        }

                        {/* Conditional for product with one attribute */}
                        {
                        !itemInCart && hasValues && selectedAttribute && !hasMoreValues ? (   
                        <Button 
                        variant='contained'
                        color='primary' 
                        sx={{ width: isMobile ? 175 : 245, marginTop: '1.5rem'}}
                        className='button btn-increase width nomad-btn'
                        id='btn-white-outline'
                        onClick={addToCart}>
                            ADD TO CART</Button> 
                    ) :
                        <></> }
                       { itemInCart && hasValues && !hasMoreValues && selectedAttribute && !hasMoreValues ? (
                        <Button 
                        variant='contained'
                        color='secondary'
                        sx={{ width: isMobile ? 175 : 245, marginTop: '1.5rem'}}
                        className='button btn-increase width nomad-btn'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            UPDATE CART</Button> 
                    ) :                
                        <></>}
                   
                        {/* Conditional for product with two attributes */}
                        {
                        !itemInCart && hasValues && selectedAttribute && hasMoreValues && selectedAttribute2 ? (   
                        <Button 
                        variant='contained'
                        color='primary' 
                        sx={{ width: isMobile ? 175 : 245, marginTop: '1rem'}}
                        className='button nomad-btn'
                        id='btn-white-outline'
                        onClick={addToCart}>
                            ADD TO CART</Button> 
                    ) :
                        <></> }
                       { 
                       itemInCart && hasValues && hasMoreValues && selectedAttribute && hasMoreValues && selectedAttribute2 ? (
                        <Button 
                        variant='contained'
                        color='secondary'
                        sx={{ width: isMobile ? 175 : 245, marginTop: '1rem'}}
                        className='button  nomad-btn'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            UPDATE CART</Button> 
                    ) : 
                        <></>}
                    
                
            </CardContent>
        </Card>
     
    )
}

export default FeaturedProduct;