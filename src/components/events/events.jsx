import React, { useContext } from "react";
import { EventsContext } from "../../context/events-context";
import { Grid, Box } from '@mui/material'
import Layout from "../shared/layout";
import { DeviceSize } from '../../utils/DeviceSize';
import { useMediaQuery } from "react-responsive";
import FeaturedEvents from "../shared/featured-events";

const EventPage = () => {
    const { events } = useContext(EventsContext);
    const allEvents = events.map(event =>(
        <Grid item xs={8} sm={6} md={4} spacing={1}>
            <FeaturedEvents {...event } key={event.id} />
            {/* {event.title}
            <img src={event.imageUrl} alt='event' /> */}
        </Grid>
    ))
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    return (
        <Layout>
            <Grid 
            container 
            display="flex" 
            justifyContent="center" 
            sx={{ padding: !isMobile ? '1rem 1.5rem' : 'none' }} 
            >
                {
                    allEvents
                }
            </Grid>
        </Layout>
    )
}

export default EventPage;