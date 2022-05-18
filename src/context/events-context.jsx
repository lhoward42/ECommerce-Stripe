import React, { useEffect, createContext, useState } from 'react';
import APIURL from '../utils/environment';
import { format, isMatch } from 'date-fns';

export const EventsContext = createContext();

const EventsContextProvider = ({ children }) => {
const [events, setEvents] = useState([])
const [event, setEvent] = useState({});
const [title, setTitle] = useState(null);
const [imageUrl, setImageUrl] = useState(null);
const [description, setDescription] = useState(null);
const [date, setDate] = useState(null);
const [startTime, setStartTime] = useState(null);
const [endTime, setEndTime] = useState(null);
const [location, setLocation] = useState(null);
const [checked, setChecked] = useState(true)

useEffect(() => {
  fetchAllEvents();
}, [])


//MUI Functions 
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

function getStyles(val, removeVal, theme) {
    return {
      fontWeight:
        removeVal.indexOf(val) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        switch (name) {
            case 'title': {
                setEvent({...event, title: value });
                break;
            }
            case 'imageUrl': {
                setEvent({...event, imageUrl: value });
                break;
            }
            case 'description': {
                setEvent({...event, description: value });
                break;
            }
            case 'date': {
                setEvent({...event, date: value });
                break;
            }
            case 'startTime': {
                setEvent({...event, startTime: value });
                break;
            }
            case 'endTime': {
                setEvent({...event, endTime: value }); 
                break;
            }
            case 'location': {
                setEvent({...event, location: value });
                break;
            }
            case 'hasProduct': {
                setChecked(checked);
                // setEvent({...event, hasProduct: checked });
                console.log(checked);
                break;
            }
            default:
                break;
        }
    }

    const fetchAllEvents = async () => {
        try{
            let res = await fetch(`${APIURL}/events/all`, {
                method: "GET", 
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            });
            let data = await res.json();
            await setEvents(data);
            await localStorage.setItem("events", JSON.stringify(data));
            console.log(data);
        } catch (err) {
            console.error(err)
        }
    }

    const formValidation = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        const eventData = {...event, hasProduct: checked };
        // const dateMatch = isMatch(event.date,'yyyy-MM-dd');
        // const endTimeMatch = isMatch(event.endTime, 'hh:mm a');
        // const startTimeMatch = isMatch(event.startTime, 'hh:mm a');
        try {
        // if(dateMatch === true && 
        // endTimeMatch === true &&
        // startTimeMatch === true 
        // ){ 
            let res = await fetch(`${APIURL}/events/new-event`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }),
                body: JSON.stringify(eventData),
               })  
            let data = await res.json();
            console.log(data);
            console.log("Success", eventData);
        // }
    } catch (err) {
        console.error(err);
    }
    //    console.log(endTimeMatch);
    //    console.log(format(new Date(event.date), 'yyyy-MM-dd'));
    }

    //Update Event 
    const updateEvent = async (e) =>{
        e.preventDefault();
        const token = localStorage.getItem("token");
        const eventData = {
            title: title,
            imageUrl: imageUrl,
            description: description,
            date: date,
            startTime: startTime,
            endTime: endTime,
            location: location,
            hasProduct: checked
        };
        try { 
            const res = await fetch(`${APIURL}/events/${event.id}`,{
                method: 'PUT',
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }),
                body: JSON.stringify(eventData),
            })
            let data = await res.json();
            console.log(data);
        } catch (err) {
            console.log("Happening here ******", err)
        }
    }

    const contextValues = {    
        event,
        title,
        description,
        date,
        MenuProps,
        events,
        startTime,        
        endTime,
        location,  
        checked,
        imageUrl,
        setImageUrl,       
        setChecked, 
        setLocation,
        setStartTime,
        setEndTime,
        setEvents,
        getStyles,
        setDate,
        updateEvent,
        formValidation,
        setDescription,
        setTitle,
        setEvent,
        handleChange,
    }

   

    return (
        <EventsContext.Provider value={ contextValues }>
            {
                children
            }
        </EventsContext.Provider>
    )
}

export default EventsContextProvider;