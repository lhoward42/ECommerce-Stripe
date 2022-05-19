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


    return (
        
        <Card sx={{ backgroundColor: '#FFD8C4', color: '#3B1E57', margin: '.5rem', minWidth: isMobile ? "100%" : " 50%", minHeight: isMobile ? '45rem' : '66.5rem' }}>
            <CardContent className='featured-image' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem',}}>
                { token ? 
                <div className="container"> 
                {/* import update component in here and the navigation method for react-router 6 */}
                    <Link className='btn-increase' to={`/update-product/${id}`}>Edit</Link>
                    </div> 
                    : 
                    <></>
                    }
                    <p>{category}</p>
               
                <Link to={`/product/${id}`}>
                <CardMedia 
                sx={{objectFit: 'cover', maxWidth: '40rem', maxHeight: '35rem'}}
                component='img'
                image={imageUrl} 
                alt='product'
                /> 
                </Link> 
              
                {/* <Typography variant="div">{date}</Typography> */}
                {/* <div className='name-price'> */}
                <Typography variant="h5" >{title}</Typography>
                <p>$ {price}</p>    
                {/* </div> */}
                <InputLabel id="demo-multiple-name-label">Qty</InputLabel>
                {populateQuantities(1, 100)}
                
                
                     {/* select menu for first set of attributes */}
                    { hasValues && 
                    <FormControl size="small" sx={{ margin: '1rem' }}>
                    <Select
                    sx={{ width: 100, marginTop: '.5rem' }} 
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
                    <FormControl size="small" sx={{ margin: '1rem' }}>
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
                    {!itemInCart && !hasValues ? (   
                        <Button 
                        sx={{ marginTop: '1rem'}}
                        className='button btn-increase width nomad-btn'
                        onClick={addToCart}>
                            ADD TO CART</Button> 
                    ) : itemInCart && !hasValues ? (
                        <Button
                        sx={{ marginTop: '1rem'}}
                        className='button is-white width nomad-btn'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            UPDATE CART</Button> 
                    ) : <></>
                        }

                        {/* Conditional for product with one attribute */}
                        {
                        !itemInCart && hasValues && selectedAttribute && !hasMoreValues ? (   
                        <Button 
                        sx={{ marginTop: '1rem'}}
                        className='button btn-increase width nomad-btn'
                        onClick={addToCart}>
                            ADD TO CART</Button> 
                    ) :
                        <></> }
                       { itemInCart && hasValues && !hasMoreValues && selectedAttribute && !hasMoreValues ? (
                        <Button 
                        sx={{ marginTop: '1rem'}}
                        className='button is-white width nomad-btn'
                        id='btn-white-outline'
                        onClick={updateCart}>
                            UPDATE CART</Button> 
                    ) :                
                        <></>}
                   
                        {/* Conditional for product with two attributes */}
                        {
                        !itemInCart && hasValues && selectedAttribute && hasMoreValues && selectedAttribute2 ? (   
                        <Button 
                        sx={{ marginTop: '1rem'}}
                        className='button is-black nomad-btn'
                        onClick={addToCart}>
                            ADD TO CART</Button> 
                    ) :
                        <></> }
                       { 
                       itemInCart && hasValues && hasMoreValues && selectedAttribute && hasMoreValues && selectedAttribute2 ? (
                        <Button 
                        sx={{ marginTop: '1rem'}}
                        className='button is-white nomad-btn'
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