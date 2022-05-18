import { EventsContext } from "../../../context/events-context";
import { useContext, useEffect } from "react";
import Layout from "../../shared/layout";
import { useParams, useNavigate } from 'react-router-dom';
import { Checkbox } from '@mui/material'

const UpdateEvent = (props) => {
    const { events, updateEvent, deleteEvent, setTitle, setDescription, setDate, setStartTime,
         setEndTime, setLocation, setHasProduct, checked, setChecked, handleChange, imageUrl, 
         setImageUrl } = useContext(EventsContext);
    const { id } = useParams();
    const navigate = useNavigate();


    // useEffect(() => {
    //     const event = events.find(item => Number(item.id) === Number(id));

    //     if(!event){
    //         return "Event Not Found"
    //     }
    // })



    return(
        <Layout>
        <div className="container">
        <h3> Update Events </h3>
            <form onSubmit={updateEvent} >
                <div className="form-group">
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
                onClick={() => deleteEvent()}
                >
                Delete Event From Store
                </button>
        </div>
        </Layout>
    )
}

export default UpdateEvent