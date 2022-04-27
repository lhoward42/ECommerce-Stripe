import React, { createContext, useReducer } from 'react';
import adminReducer from './admin-reducer';
import APIURL from '../utils/environment';

export const AdminContext = createContext();

const getTokenFromStorage = localStorage.getItem("token") ? JSON.stringify(localStorage.getItem("token")) : ""

const initialState = { token: getTokenFromStorage, email: "", password: "" }

const AdminContextProvider = ({ children }) => {
    const [state, dispatch ] = useReducer(adminReducer, initialState);
    const setEmail = (email) => dispatch({ type: 'SET_EMAIL', payload: { email: email }})
    const setPassword = (password) => dispatch({ type: 'SET_PASSWORD', payload: { password: password }})
    const adminSignUp = (newAdminData) => dispatch({ type: 'REGISTER', payload: { newAdmin: newAdminData }})
    // useEffect(() => {
    //     if(getTokenFromStorage){
    //         setToken(getTokenFromStorage);
    //     }
    //     console.log(getTokenFromStorage);
    // }, []);

    // const updateToken = (newToken) => {
    //     localStorage.setItem("token", newToken);
    //     setToken(newToken);
    //   };
    
    // const clearToken = () => {
    //     localStorage.clear();
    //     setToken("");
    //   } 

    const contextValues = {
        ...state,
        setEmail,
        setPassword,
        adminSignUp,

    }

    return (
        <AdminContext.Provider value={ contextValues }>
            {
                children
            }
        </AdminContext.Provider>
    )
}

export default AdminContextProvider