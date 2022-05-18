import React, { useContext, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
import { isInCart, hasValueAttributes, hasValueAttributes2 } from '../../helpers';
import { CartContext } from '../../context/cart-context';
import { Link } from 'react-router-dom';
import './featured-products.styles.scss';
import { useMediaQuery } from "react-responsive";
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
import { EventsContext } from '../../context/events-context';

const FeaturedEvents = (props) => {
    const { title, description, date, endTime, startTime, location, hasProduct} = useContext(EventsContext);
    return(
        <Card>

        </Card>
    )
}

export default FeaturedEvents; 