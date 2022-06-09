import React, { useState } from "react";
import APIURL from "../../utils/environment";
import Layout from "../shared/layout";
import { Button, Container } from '@mui/material';

const ResetRequest = () => {
    const [email, setEmail] = useState(null)
    const requestReset = async (e) => {
        e.preventDefault();
        // const data = {
        //     email: email
        // }
        try {
            let res = await fetch(`${APIURL}/admin/reset-request`,{
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({email: email}),
            });
            let data = await res.json();
            console.log(data);
            if(data) { alert('request has been sent') }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Layout>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
        <input
                style={{ marginBottom: '1rem', height: '2rem', width: '65%'}}
                className="form-control"
                type="email"           
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                variant='contained'
                color='secondary'
                onClick={(e) =>requestReset(e)}>Send Request
                </Button>
                </Container>
        </Layout>
    )
}

export default ResetRequest