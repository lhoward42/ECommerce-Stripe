import { useContext, useState } from "react";
import { EventsContext } from "../../../context/events-context";
import Layout from "../../shared/layout";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { format, parseISO  } from 'date-fns';
import Checkbox from '@mui/material/Checkbox';


const CreateEvent = () => {
    const { createEvent, handleChange, event, checked, handleChecked } = useContext(EventsContext);
    // const eventDate = format(new Date(event.date), 'MMM dd, YYYY')
    const date = (new Date(JSON.stringify(event.date)));
    


    console.log(date);
    return (
        <Layout>  
            {/* {event.date} */}
            {/* {format(new Date('April 1, 1992'), 'MMMM do, yyyy')} */}        
            <div className="container">
                <h3>New Event</h3>
            <form onSubmit={createEvent}>
                <div className="form-group">
                    <label>Event Name: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="title"
                    placeholder="Name"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Image URL: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={(e) => handleChange(e)}
                    />
                </div> 
                <div className="form-group">
                    <label>Date: </label>
                    <input
                    className="form-control"
                    type="date"
                    name="date"
                    placeholder="Date"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Start Time: </label>
                    <input
                    className="form-control"
                    type="time"
                    name="startTime"
                    placeholder="Start Time"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label>End Time: </label>
                    <input
                    className="form-control"
                    type="time"
                    name="endTime"
                    placeholder="End Time"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Location: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={(e) => handleChange(e)}
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
                    <button 
                    className="is-black submit nomad-btn " 
                    type="submit"
                    >
                        Create New Event
                    </button>
                </div>
            </form>
            </div>
        </Layout>
    )
}

export default CreateEvent;