import React, { useState } from "react";
import APIURL from "../../utils/environment";
import Layout from "../shared/layout";
import { useParams } from 'react-router-dom';
import { Button, Container } from '@mui/material'

const ResetPassword = () => {
    const [password, setPassword] = useState(null)
    const { id, resetToken } = useParams();
    const updatePassword = async (e) => {
        e.preventDefault();
        const resetData = {
            password,
            id,
            token: resetToken,
        };
        try {
            let res = await fetch(`${APIURL}/admin/password-reset`, {
                method: 'PUT',
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(resetData),
            })
            let data = res.json();
           alert("success");
           console.log(data);
           return data

        } catch (err) {
            console.error(err)
            alert('update incomplete')
        }

    }

    return (
        <Layout>
           <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
        <input
                style={{ marginBottom: '1rem', height: '2rem', width: '65%'}}
                className="form-control"
                type="password"           
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                variant='contained'
                color='secondary'
                onClick={(e) =>updatePassword(e)}
                >
                 Reset Password   
                </Button>
            </Container>
        </Layout>
    )
}

export default ResetPassword