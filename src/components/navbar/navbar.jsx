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
import VintageTruck from '../../assets/vintagetruck.svg'
import CartIcon from "../cart-icon/cart-icon";
import { Link } from "react-router-dom";
import './navbar.styles.scss'


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

  return (
    <AppBar className="nav-bar" position="sticky" sx={{ backgroundColor: '#40FFF9', padding: '.5rem 1.25rem' }}>
    
        <Toolbar disableGutters>
        <img  className="vintage-truck" src={VintageTruck} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} alt="vintageTruck" />
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{width: '.25rem', flexGrow: '1'}}
               
            >
              <img  className="vintage-truck" src={VintageTruck} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}alt="vintageTruck" />
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
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
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

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <CartIcon onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </CartIcon>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
    
    </AppBar>
  );
};
export default ResponsiveAppBar;
