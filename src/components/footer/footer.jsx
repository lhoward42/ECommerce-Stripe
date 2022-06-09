import React from 'react'
import './footer.styles.scss'
import { Facebook, Instagram } from '@mui/icons-material'
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../../utils/DeviceSize';

const Footer = () => {
    const year = new Date().getFullYear()
    const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet })
    return (
        <div className='footer'>
            <h2>{year} © Craft Me A Dream</h2>
            <a href='https://m.facebook.com/profile.php?id=100053130804322'><Facebook sx={{color: '#3B1E57' }} fontSize='large' /></a>
           <a href='https://instagram.com/coffeechalker?igshid=YmMyMTA2M2Y='> <Instagram sx={{ color: '#3B1E57' }} fontSize='large' /></a>
        </div>
    )
}

export default Footer
