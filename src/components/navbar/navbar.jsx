import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { ListItem, ListItemText } from '@mui/material';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import VintageTruck from '../../assets/vintagetruck.svg';
import LOGO from '../../assets/CMAD-14.svg'
import CartIcon from "../cart-icon/cart-icon";
import { Link } from "react-router-dom";
import './navbar.styles.scss'
import MenuIcon from '@mui/icons-material/Menu';
import { DeviceSize } from '../../utils/DeviceSize';
import { useMediaQuery } from "react-responsive";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet });
const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <AppBar className="nav-bar" position="static" sx={{  padding: isTablet ? '0rem .75rem' : '1rem 1.25rem',  }}>
    
        <Toolbar disableGutters>
        {/* {<img  className="vintage-truck" src={LOGO} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, }} alt="vintageTruck" />} */}
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
              size="large"
              sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '50%', color: '#3B1E57'}} 
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'block' }, 
                
              }}
            >
                <MenuItem key="home" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" ><Link className="nav-links" to='/'>Home</Link></Typography>
                </MenuItem>
                <MenuItem key="shop" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link className="nav-links2" to='/shop'>Shop</Link></Typography>
                </MenuItem>
                <MenuItem key="events" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" ><Link className="nav-links" to='/events'>Events</Link></Typography>
                </MenuItem>
           
            </Menu>
          </Box>
          {/* {<img  className="vintage-truck" src={LOGO} sx={{ display: { xs: 'none', md: 'flex' }, mr: 2, }} alt="vintageTruck" />} */}
       
           {<img className="vintage-truck" src={LOGO} alt="vintageTruck" />}
      
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'row-reverse', fontSize: '1.5rem' }}>
            {/* <ListItem key="events" className='nav-links' onClick={handleCloseNavMenu} >
                  <ListItemText textAlign="right"><Link to='/events'> Events </Link></ListItemText>
                </ListItem>
            <ListItem key="shop" onClick={handleCloseNavMenu} >
                  <ListItemText textAlign="center"><Link to='/shop'> Shop </Link></ListItemText>
                </ListItem>
            <ListItem key="home" onClick={handleCloseNavMenu} >
                  <ListItemText textAlign="center"><Link to='/'> Home </Link></ListItemText>
                </ListItem> */}
                <Link className="nav-item" to='/events'> Events </Link>
                <Link className="nav-item" to='/shop'> Shop </Link>
                <Link className="nav-item" to='/'> Home </Link>
          </Box>
       
              <CartIcon />
       
        </Toolbar>
    
    </AppBar>
  );
};
export default ResponsiveAppBar;
