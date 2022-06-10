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
                setEvent({ ...event, title: value });
                break;
            }
            case 'imageUrl': {
                setEvent({ ...event, imageUrl: value });
                break;
            }
            case 'description': {
                setEvent({ ...event, description: value });
                break;
            }
            case 'date': {
                setEvent({ ...event, date: value });
                break;
            }
            case 'startTime': {
                setEvent({ ...event, startTime: value });
                break;
            }
            case 'endTime': {
                setEvent({ ...event, endTime: value });
                break;
            }
            case 'location': {
                setEvent({ ...event, location: value });
                break;
            }
            case 'hasProduct': {
                setChecked(checked);

                console.log(checked);
                break;
            }
            default:
                break;
        }
    }

    const fetchAllEvents = async () => {
        try {
            console.log('events API URL ===', APIURL);
            fetch(`${APIURL}/events/all`, {
                method: "GET",
                redirect: 'follow'
            }).then(response => response.text()).then(async (data) => {
                setEvents(data);
                console.log('events context data ===', data);
                if (data) {
                    await localStorage.setItem("events", JSON.stringify(data));
                }
            });
        } catch (err) {
            console.log(err)
        }
    }

    //create an event
    const createEvent = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        const eventData = { ...event, hasProduct: checked };

        try {
            if (token) {
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
                alert(`${event.title} has been created`)
                console.log("Success", eventData);
            } else {
                alert('Admin must be logged in to create event')
            }
        } catch (err) {
            console.log(err);
        }

    }

    //Update Event 
    const updateEvent = async (e) => {
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
            const res = await fetch(`${APIURL}/events/${event.id}`, {
                method: 'PUT',
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }),
                body: JSON.stringify(eventData),
            })
            let data = await res.json();
            console.log(data);
            alert("event successfully updated")
        } catch (err) {
            console.log("Happening here ******", err)
        }
    }

    //Delete Event

    const deleteEvent = async (event) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(
                `${APIURL}/events/${event.id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }),
            }
            );
            const data = res.json();
            console.log(data);
            alert("Event successfully deleted");
            let array = await [...events];
            console.log(array);
            let index = array.indexOf(event);
            if (index !== -1) {
                array.splice(index, 1);
                setEvents(array)
            }

        } catch (err) {
            console.log(err);
        }
    }

    const toStandardTime = (time) => {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
            console.log(time);
            time = time.slice(1);
            console.log(time);
            time = time.slice(0, 3);
            console.log(time);
            time[4] = +time[0] < 12 ? ' AM' : ' PM';
            time[0] = +time[0] % 12 || 12;

        }
        return time.join('')
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
        deleteEvent,
        toStandardTime,
        setImageUrl,
        setChecked,
        setLocation,
        setStartTime,
        setEndTime,
        setEvents,
        getStyles,
        setDate,
        updateEvent,
        createEvent,
        setDescription,
        setTitle,
        setEvent,
        handleChange,
    }



    return (
        <EventsContext.Provider value={contextValues}>
            {
                children
            }
        </EventsContext.Provider>
    )
}

export default EventsContextProvider;