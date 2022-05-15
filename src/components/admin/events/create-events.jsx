import { useContext } from "react";
import { EventsContext } from "../../../context/events-context";
import Layout from "../../shared/layout";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

const CreateEvent = () => {
    const { formValidation, handleChange } = useContext(EventsContext);
    return (
        <Layout>
            <form onSubmit={formValidation}>
            <label>Date: </label>
                <input
                className="form-control"
                type="text"
                name="date"
                placeholder="Date"
                onChange={(e) => handleChange(e)}
                />
                 <div>
                    <button 
                    className="is-black submit nomad-btn " 
                    type="submit"
                    >
                        Create New Event
                    </button>
                </div>
            </form>
        </Layout>
    )
}

export default CreateEvent;