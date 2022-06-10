import { useState } from "react";
import {Button} from '@mui/material'
import Login from "./login";
import Register from "./register";

const Portal = (props) => {
    const [showLogin, setShowLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const toggleLoginSignup = () => {
        setShowLogin(!showLogin);
      };


      const submitForm = () =>
    console.log(
      `Form is sent!\nemail: ${email}\npassword: ${password}`
    );


    return (
        <>
    { !showLogin &&    
    <Register 
        email={email}
        password={password}
        setEmail={setEmail}
        setShowLogin={setShowLogin}
        showLogin={showLogin}
        setPassword={setPassword}
        submitForm={submitForm}
        toggle={toggleLoginSignup}
        token={props.token}
        newToken={props.newToken}
    /> }
    { showLogin && <Login 
        email={email}
        password={password}
        setShowLogin={setShowLogin}
        showLogin={showLogin}
        setEmail={setEmail}
        setPassword={setPassword}
        submitForm={submitForm}
        toggle={toggleLoginSignup}
        token={props.token}
        newToken={props.newToken}
    />}
    
    </>
    
)
}

export default Portal