import React, { useState } from "react";
import APIURL from "../../utils/environment";
import Layout from "../shared/layout";
import { useParams } from 'react-router-dom';

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
        <input
                className="form-control"
                type="password"           
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={(e) =>updatePassword(e)}></button>
        </Layout>
    )
}

export default ResetPassword