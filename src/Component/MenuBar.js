import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from 'react-router-dom';
import { useProfile } from '../Context/ProfileProvider';
const pages = [
  //{name:'Flight + Hotel',link:'fight-and-hotel'},
  //{name:'Hotels & Homes',link:'hotels-and-homes'},
  //{name:'Flights',link:'fight'},
  //{name:'Today’s deals',link:'todaysdeals'},
  //{name:'Apartments',link:'apartments'}
];
const settings = [
  {name:'Profile',link:'/profile'}, 
  {name:'My Booking', link:'/mybooking'},
  {name:'Logout',link:'/logout'}
];

function ResponsiveAppBar(props) {
  const {profile} = useProfile();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElLogin, setAnchorElLogin] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenLoginMenu = (event) => {
    setAnchorElLogin(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseLoginMenu = () => {
    setAnchorElLogin(null);
  };


  const isLoggedIn = () =>{
    if(profile.lastName !== undefined){
      return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={profile.lastName} src="/static/images/avatar/2.jpg" />
              </IconButton>
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
              {settings.map((setting) => {

                  return (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Button component={Link} to={`${setting.link}`}  textAlign="center">{setting.name}</Button>
                    </MenuItem>
                  )
              })}
            </Menu>
          </Box>  
      );
    } else {
      return (
        <>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <AccountCircleIcon
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenLoginMenu}
              color="inherit"
            >
              <MenuIcon />
            </AccountCircleIcon>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElLogin}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElLogin)}
              onClose={handleCloseLoginMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key={'Login'} onClick={handleCloseLoginMenu}>
                <Typography              
                  component={Link} to={'/login'}  textalign="center"
                  sx={{color:"black", textDecoration: "none" }}
                >
                  Login
                </Typography>
              </MenuItem>
              <MenuItem key={'Regtiser'} onClick={handleCloseLoginMenu}>
                <Typography              
                  component={Link} to={'/Register'}  textalign="center"
                  sx={{color:"black", textDecoration: "none" }}
                >
                  Regtiser
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
          <Button
              key={1}
              component={Link} 
              to={'/login'}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Login
            </Button>
            <Button
              key={2}
              component={Link} 
              to={'/Register'}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Register
            </Button>
        </Box>
        </>
      );
    }
  }

  
  return (
    <AppBar position="static">
      <Container maxWidth="false">
        <Toolbar disableGutters>
        <Typography
             variant="h6"
             noWrap
             component={Link}
             to={'/'}
             sx={{ mr: 2, color:'white',textDecoration: "none", display: { xs: 'none', md: 'flex' } }}
           >
             Clone
             <br/>
             Agoda
           </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                  <Typography              
                    component={Link} to={`/${page.link}`}  textalign="center"
                    sx={{color:"black", textDecoration: "none" }}
                  >{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
             variant="h6"
             noWrap
             component={Link}
             to={''}
             sx={{textDecoration: "none",color:'white', flexGrow: 1, display: { xs: 'flex', md: 'none' }}}
           >
             Clone
             <br/>
             Agoda
           </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.link}
                component={Link} 
                to={`/${page.link}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {isLoggedIn()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
