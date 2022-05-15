import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/footer'
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from '../../utils/DeviceSize.js';




const Layout = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    
    return (
        <>
        <Header />
        <main>
            {
              children  
            }
        </main>
        <Footer />
        </>
    )
}

export default Layout
