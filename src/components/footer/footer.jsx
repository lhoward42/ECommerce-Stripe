import React from 'react'
import './footer.styles.scss'
import { FacebookIcon, InstagramIcon } from '@mui/icons-material'

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <div className='footer'>
            {year} © Craft Me A Dream
        </div>
    )
}

export default Footer
