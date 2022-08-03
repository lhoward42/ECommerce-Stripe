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
import { textAlign } from '@mui/system';

const FeaturedEvents = (props) => {
    const { title, description, date, id, endTime, startTime, location, hasProduct, imageUrl } = props
    const event = { title, description, date, id, endTime, startTime, location, hasProduct, imageUrl};
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet });
    const isTabletMin = useMediaQuery({ minWidth: DeviceSize.tablet });
    const isLaptop2Min = useMediaQuery({ minWidth: DeviceSize.laptop2});
    const { toStandardTime } = useContext(EventsContext);
    const token = localStorage.getItem("token");
    
    // const toStandardTime = (militaryTime) => {
    //     const [hours, minutes, seconds ] = militaryTime.split(':');
    //     return `${(hours > 12) ? hours - 12 ? hours === 0 : hours + 1 : hours }:${minutes} ${(hours >= 12) ? 'AM' : 'PM'}`

    // }


    // console.log(startTime.split(':'));

    
    
    return(
        <Card 
        sx={{ backgroundColor: 'transparent', color: '#3B1E57',
         margin: '1rem 0rem', minWidth: isMobile ? "100%" : " 50%",
         
         opacity: '92%', boxShadow: 'none', padding: '0', borderRadius: '0px' }}
       
        >
            { token ? 
                <div className="container"> 
                {/* import update component in here and the navigation method for react-router 6 */}
                    <Link style={{ 
                        color: 'black', 
                        width: '50%', 
                        display: 'block', 
                        backgroundColor: 'white',
                        padding: '.4rem 5px',  
                        textAlign: 'center',
                        margin: '.6rem auto'
                        }} 
                        className='btn-increase' 
                        to={`/admin-home/update-event/${id}`}
                        >
                            Edit
                        </Link>
                    </div> 
                    : 
                    <></>
                    }
            <CardContent className='featured-image' sx={{ display: 'flex', flexDirection: 'column', padding: '0', paddingBottom: isTabletMin && '0rem !important' }}>
            <Link to={`/events/${title}/${id}`}>
            <CardMedia 
                sx={{objectFit: 'cover', maxHeight: '35rem', marginTop:'1rem',marginBottom: '.25rem', marginLeft: '-.25rem' }}
                component='img'
                image={imageUrl} 
                alt='event'
                /> 
                </Link> 
                <Typography variant="h5" sx={{ textAlign: 'start', font: 'inherit', fontSize: '1.2rem', fontWeight: 'bold', marginLeft: '.1rem' }}>{title}</Typography>
                <Typography variant='h3' sx={{ textAlign: 'start', font: 'inherit', fontSize: '1rem', marginLeft: '.1rem'  }}>{format(new Date(date), 'MMM dd, yyyy')}</Typography>
                <Typography variant='h3' sx={{ textAlign: 'start', font: 'inherit', fontSize: '1rem',  marginLeft: '.1rem' }}>{toStandardTime(startTime)}</Typography>
                <Typography variant='h3' sx={{ textAlign: 'start', font: 'inherit', fontSize: '1rem', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', marginLeft: '.1rem' }}>{description}</Typography>
                <Link to={`/events/${title}/${id}`}  style={{ fontSize: '1rem', fontWeight: 'bold', borderRadius: '4px', opacity: '-moz-initial.75', width: '65%', marginBottom: isMobile ? '0' : '1rem',  textDecoration: 'underline', marginLeft: '.1rem'}}>View Event</Link>
            </CardContent>
        </Card>
    )
}

export default FeaturedEvents; 