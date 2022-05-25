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
import LOGO from '../../assets/CMAD-9.png'
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

  return (
    <AppBar className="nav-bar" position="sticky" sx={{ background: 'linear-gradient(180deg, rgba(220,211,239,1) 0%, rgba(167,229,236,1) 3%, rgba(119,244,234,1) 8%, rgba(64,255,249,0.9514399509803921) 31%, rgba(122,243,233,0.9122242647058824) 66%, rgba(153,233,235,1) 73%, rgba(162,230,236,1) 78%, rgba(190,221,237,1) 87%, rgba(238,205,240,0.9570421918767507) 95%, rgba(255,199,241,0.9794511554621849) 99%, rgba(59,30,87,0.774969362745098) 100%)', padding: '.5rem 1.25rem' }}>
    
        <Toolbar disableGutters>
        {/* {<img  className="vintage-truck" src={LOGO} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, }} alt="vintageTruck" />} */}
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
              size="large"
              sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '50%'}} 
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                <MenuItem key="home"  onClick={handleCloseNavMenu}>
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
       
           {<img className="vintage-truck" src={LOGO} alt="vintageTruck"  />}
      
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'row-reverse' }}>
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
