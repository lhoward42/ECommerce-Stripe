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
              sx={{ }}
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
      const isLaptop2 = useMediaQuery({ maxWidth: DeviceSize.laptop2 });
      const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet });
    return (
        
        <Card className="featured-card" sx={{ padding: '0',backgroundColor: 'transparent', color: '#3B1E57', minWidth: isMobile ? "100%" : " 98%", minHeight: isMobile && 'fit-content',  boxShadow: 'none', overflow: 'visible'}}>
           
                { token ? 
                <div className="container"> 
                {/* import update component in here and the navigation method for react-router 6 */}
                    <Link className='btn-increase' to={`/update-product/${id}`}>Edit</Link>
                    </div> 
                    : 
                    <></>
                    }
                    
               <CardContent className='featured-image' sx={{  padding:'0', paddingBottom: '0 !important' }}> 
                <Link to={`/product/${id}`}>
                <CardMedia 
                sx={{objectFit: 'cover', maxHeight: '35rem', marginBottom: '.25rem', marginLeft: isMobile && '-.25rem', width: '100%' }}
                component='img'
                image={imageUrl} 
                alt='product'
                /> 
                </Link> 
              
                
                <Typography sx={{ textAlign: 'start', font: 'inherit', fontSize: '1.2rem', fontWeight: 'bold', marginLeft: '.1rem' }} variant="h1" >{title}</Typography>
                <Typography sx={{ fontSize: '1.2rem !important', fontFamily: 'inherit', fontWeight: '500', marginLeft: '.1rem' }} variant="h2">$ {price}</Typography >                
                
               {/* </div> */}     
                
            </CardContent>
        </Card>
     
    )
}

export default FeaturedProduct;