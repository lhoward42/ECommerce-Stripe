import Layout from "../shared/layout";
import { useState } from "react";
import APIURL from "../../utils/environment";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = ({ token, setEmail, setPassword, email, password, newToken, setShowLogin, showLogin }) => {
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
         let response = await fetch(`${APIURL}/admin/register`, {
            method: 'POST',
            headers: new Headers ({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(adminData)
        })
        let data = await response.json();
        await newToken(data.sessionToken);
        await setLocalToken(data.sessionToken);
        alert('Admin signed up in!');  
        

        } catch (err){ console.log(err);}
        
    }
  return (
<Layout>

<Button onClick={() => setShowLogin(!showLogin)}><u>Already an Admin? Login </u></Button>
  
    
  <form onSubmit={adminSignUp}>
    <h1>Register</h1>
      <h4>Email</h4>
       <input value={email} onChange={(e) => { setEmail(e.target.value)}} />
       <h4>Password</h4>
       <input style={{marginBottom: "1rem"}} value={password} onChange={(e) => { setPassword(e.target.value)}} />
       <br />
       <input type="submit" value="Submit"/>
   </form>

</Layout>
   )
}

export default Register