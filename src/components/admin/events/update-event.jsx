import { EventsContext } from "../../../context/events-context";
import { useContext, useEffect } from "react";
import Layout from "../../shared/layout";
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEvent = (props) => {
    const { events } = useContext(EventsContext);
    const { id } = useParams();
    const navigate = useNavigate();


    return(<></>)
}

export default UpdateEvent