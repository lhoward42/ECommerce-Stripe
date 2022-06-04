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
    const { toStandardTime } = useContext(EventsContext);
    const token = localStorage.getItem("token");
    
    // const toStandardTime = (militaryTime) => {
    //     const [hours, minutes, seconds ] = militaryTime.split(':');
    //     return `${(hours > 12) ? hours - 12 ? hours === 0 : hours + 1 : hours }:${minutes} ${(hours >= 12) ? 'AM' : 'PM'}`

    // }


    // console.log(startTime.split(':'));

    

    return(
        <Card sx={{ backgroundColor: 'transparent', color: '#3B1E57', margin: '.5rem', minWidth: isMobile ? "100%" : " 50%", minHeight: isMobile ? 'fit-content' : isTablet ? '42rem' : '42rem', opacity: '92%', boxShadow: 'none' }}>
            { token ? 
                <div className="container"> 
                {/* import update component in here and the navigation method for react-router 6 */}
                    <Link style={{ 
                        color: 'black', 
                        width: '50%', 
                        display: 'block', 
                        backgroundColor: 'white',
                        padding: '.4rem 5px',
                        borderRadius: '3.5%',
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
            <CardContent className='featured-image' sx={{ display: 'flex', flexDirection: 'column', padding: '0'}}>
            <Link to={`/events/${title}/${id}`}>
            <CardMedia 
                sx={{objectFit: 'cover', maxHeight: '35rem', marginBottom: '1rem' }}
                component='img'
                image={imageUrl} 
                alt='event'
                /> 
                </Link>
                <Typography variant="h5" sx={{ textAlign: 'center', font: 'inherit', fontSize: '1.75rem', fontWeight: 'bold' }}>{title}</Typography>
                <Typography variant='h3' sx={{ textAlign: 'center', font: 'inherit', fontSize: '1.4rem', fontWeight: 'bold' }}>{format(new Date(date), 'MMM dd, yyyy')}</Typography>
                <Typography variant='h3' sx={{ textAlign: 'center', font: 'inherit', fontSize: '1.25rem', fontWeight: 'bold' }}>{toStandardTime(startTime)}</Typography>
                <Typography variant='h3' sx={{ textAlign: 'center', font: 'inherit', fontSize: '1.25rem', overflow: 'hidden', textOverflow: 'ellipsis', width: '65%', marginBottom: '1rem' }}>{description}</Typography>
                <Link to={`/events/${title}/${id}`} className="nomad-btn btn-white-outline" style={{ display: 'flex', padding: '.25rem .8rem', fontSize: '1.35rem', fontWeight: 'bold', color: 'rgb(64, 255, 249, .9)', backgroundColor: 'rgb(59, 30, 87, .9)', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', border: '1px solid grey', opacity: '-moz-initial.75', width: '65%', marginBottom: '1rem' }}>View Event</Link>
            </CardContent>
        </Card>
    )
}

export default FeaturedEvents; 