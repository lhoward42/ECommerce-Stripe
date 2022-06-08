import { EventsContext } from "../../../context/events-context";
import { useContext, useEffect } from "react";
import Layout from "../../shared/layout";
import { useParams, useNavigate } from 'react-router-dom';
import { Checkbox } from '@mui/material'
import { set } from "date-fns";

const UpdateEvent = (props) => {
    const { events, setEvent, updateEvent, deleteEvent, setTitle, setDescription, setDate, setStartTime,
         setEndTime, setLocation, checked, setChecked, handleChange, imageUrl, event,
         setImageUrl } = useContext(EventsContext);
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const ev = events.find(item => Number(item.id) === Number(id));

        if(!ev){
            return navigate('/events');
        }

        setEvent(ev);
        setTitle(ev.title);
        setDescription(ev.description);
        setDate(ev.date);
        setStartTime(ev.startTime);
        setEndTime(ev.endTime);
        setLocation(ev.location);
        setChecked(ev.hasProduct);
        setImageUrl(ev.imageUrl);

    }, [id, navigate, events, setEvent, setTitle, setDescription, setDate, setStartTime, setEndTime, setLocation, setChecked, setImageUrl ])

    

    return(
        <Layout>
        <div className="container">
        <h3> Update Events </h3>
            <form onSubmit={updateEvent} >
                <div className="form-group">
                    <img src={event.imageUrl} alt='event' />
                    <label>Event Name: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="title"
                    placeholder="Name"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Event Image: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="imageUrl"
                    placeholder="image url here"
                    onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <input
                    className="form-control"
                    type="date"
                    name="date"
                    placeholder="Enter a Valid Date YYYY-MM-DD"
                    onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Start Time: </label>
                    <input
                    className="form-control"
                    type="time"
                    name="start time"
                    placeholder="Enter a Time  00:00 -M"
                    onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>End Time: </label>
                    <input
                    className="form-control"
                    type="time"
                    name="end time"
                    placeholder="Enter a Time  00:00 -M"
                    onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Location: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Products or Tickets?</label>
                    <Checkbox
                    className="form-control"
                    inputProps={{ 'aria-label': 'controlled' }}
                    name="hasProduct"
                    checked={checked}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit">Update Event</button>
                </div>
 
            </form>
            <button
                type ="button" 
                onClick={() => deleteEvent(event)}
                >
                Delete Event From Store
                </button>
        </div>
        </Layout>
    )
}

export default UpdateEvent