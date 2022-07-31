import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/footer'
import ResponsiveAppBar from '../navbar/navbar';
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from '../../utils/DeviceSize.js';
import './layout.styles.scss'



const Layout = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    
    return (
        <div className='layout'>
        {/* <Header /> */}
        <ResponsiveAppBar />
        <main style={{ maxWidth: "100vw" }}>
            {
              children  
            }
        </main>
        <Footer />
        </div>
    )
}

export default Layout
