import Layout from "../shared/layout";
import { useState } from "react/cjs/react.development";
import APIURL from "../../utils/environment";


const Login = ({ email, setEmail, password, setPassword, newToken }) => {

    const [localToken, setLocalToken] = useState("");
  const confirmAndSend = () => {
      adminSignUp()
  }


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
        let data = await response.json();
        await newToken(data.sessionToken);
        await setLocalToken(data.sessionToken);
        console.log(data);   
        } catch (err){ console.log(err);}
        
    }
    return (
        <Layout>
          <form onSubmit={adminSignUp}>
              <h4>Email</h4>
               <input value={email} onChange={(e) => { setEmail(e.target.value)}} />
               <h4>Password</h4>
               <input value={password} onChange={(e) => { setPassword(e.target.value)}} />
               <br />
               <input type="submit" value="Submit"/>
           </form>
        </Layout>
           )
}

export default Login