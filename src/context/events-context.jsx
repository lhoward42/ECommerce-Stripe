import React, { useEffect, createContext, useState } from 'react';
import APIURL from '../utils/environment';
import { format, isMatch } from 'date-fns';

export const EventsContext = createContext();

const EventsContextProvider = ({ children }) => {
const [events, setEvents] = useState([])
const [event, setEvent] = useState({});
const [title, setTitle] = useState(null);
const [description, setDescription] = useState(null);
const [year, setYear] = useState(null);
const [month, setMonth] = useState(null);
const [date, setDate] = useState(null);

// useEffect(() => {
//   fetchAllEvents()
// }, [])

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
                setEvent({...event, hasProduct: checked });
                break;
            }
            default:
                break;
        }
    }

    const formValidation = (e) => {
        // e.preventDefault();
       const dateMatch = isMatch(event.date,'yyyy-MM-dd');
       console.log(dateMatch);
    }
    const contextValues = {
        
        event,
        title,
        description,
        year,
        month,
        date,
        MenuProps,
        events,
        setEvents,
        getStyles,
        setDate,
        setMonth,
        formValidation,
        setYear,
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