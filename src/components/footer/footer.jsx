import React from 'react'
import './footer.styles.scss'
import { Facebook, Instagram } from '@mui/icons-material'

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <div className='footer'>
            {year} © Craft Me A Dream
            <a href='https://www.facebook.com'><Facebook /></a>
           <a href='https://www.instagram.com'> <Instagram /></a>
        </div>
    )
}

export default Footer
