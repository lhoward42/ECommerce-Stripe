import React, { useContext } from "react";
import { EventsContext } from "../../context/events-context";
import { Grid, Box } from '@mui/material'
import Layout from "../shared/layout";
import { DeviceSize } from '../../utils/DeviceSize';
import { useMediaQuery } from "react-responsive";
import FeaturedEvents from "../shared/featured-events";
import EventSign from '../../assets/EventSign.png'

const EventPage = () => {
    const { events } = useContext(EventsContext);
    const allEvents = events.map(event =>(
        <Grid item xs={5.6} sm={2.9} md={2.9} sx={{ margin: '0rem .15rem' }} >
            <FeaturedEvents {...event } key={event.id} />
            {/* {event.title}
            <img src={event.imageUrl} alt='event' /> */}
        </Grid>
    ))
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet })
    const isLaptop2 = useMediaQuery({ maxWidth: DeviceSize.laptop2 });
    const isLaptop2Min = useMediaQuery({ minWidth: DeviceSize.laptop2})

    return (
        <Layout>
             <div className='sign-div'><img className='event-sign' sx={{  }} src={EventSign} alt='shop'/></div>
            {/* <h1 style={{ textAlign: 'center', margin: '2.5rem 2rem .5rem 2rem', fontSize: isMobile ? '3rem': isLaptop2 ? '4rem' : '5rem' }}>Events</h1> */}
            <div style={{ padding: isMobile ? '.5rem .75rem' : isTablet ? '1rem' : '0rem 1rem' }}>
            <Grid 
            container 
            display="flex" 
            justifyContent="center" 
            sx={{ padding: isMobile ? '1rem 0' : isTablet ? '1rem .5rem 0rem .5rem' : '2rem 1.75rem 2rem 1.25rem', background: 'rgba(255, 199, 241, .7)', boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px'}} 
            >
                {
                    allEvents
                }
            </Grid>
            </div>
        </Layout>
    )
}

export default EventPage;