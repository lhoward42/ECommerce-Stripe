import Layout from "../shared/layout";
import { useState } from "react";
import APIURL from "../../utils/environment";
import {Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login = ({ email, setEmail, password, setPassword, newToken, setShowLogin, showLogin, logout }) => {

    const [localToken, setLocalToken] = useState("");
    const confirmAndSend = () => {
      adminSignUp()
    }
    const navigate = useNavigate();

    const adminSignUp = async (e) => {
        
    e.preventDefault();
    const adminData = {
            email: email,
            password: password
        }
     console.log(`newUserData --> ${adminData.email} ${adminData.password}`);
       try {
         let response = await fetch(`${APIURL}/admin/login`, {
            method: 'POST',
            headers: new Headers ({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(adminData)
        })
        if (response.status === 200){
        let data = await response.json();
        await newToken(data.sessionToken);
        setLocalToken(data.sessionToken);
        alert('Admin successfully logged in');
        navigate('/'); 
        } else if (response.status === 401){
          console.log("failed");
        }
        //logic for 401 status (if) conditional statement
          
        } catch (err){ console.log("error message",err);}      
    }
    return (
        <Layout>
            <Button onClick={() => setShowLogin(!showLogin)}><u>Not A User </u></Button>
        <div>
            
          <form onSubmit={adminSignUp}>
            <h1>Login</h1>
              <h4>Email</h4>
               <input value={email} onChange={(e) => { setEmail(e.target.value)}} />
               <h4>Password</h4>
               <input style={{marginBottom: "1rem"}} value={password} onChange={(e) => { setPassword(e.target.value)}} />
               <br />
               <input type="submit" value="Submit"/>
           </form>
           <Button sx={{display: "flex", justifyContent: "center", marginLeft: "auto", marginRight: "auto", marginBottom: "1.5rem" }} variant="contained" onClick={() => logout()}>Logout</Button>
           </div>
        </Layout>
           )
}

export default Login