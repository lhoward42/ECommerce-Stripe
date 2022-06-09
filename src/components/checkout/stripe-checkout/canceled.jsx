import React from "react";
import { useNavigate } from 'react-router-dom';
import Layout from '../../shared/layout';
import { Button } from '@mui/material'


const Canceled = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="checkout">
                <h1>Payment Failed</h1>
                <p>Payment was not successful</p>
                <div>
                     <Button 
                        className="button submit"
                        color="secondary"
                        variant="contained"
                        onClick={() => navigate('/shop')}
                      >
                         Continue Shopping
                     </Button>
                 </div>
            </div>
        </Layout>
    )
}

export default Canceled