import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Icon, SvgIcon, Grid } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { Navigation } from "../navigation";
import logo from "../images/Logo.png";
import './AppBarComponent.css';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AppBarComponent() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static"
      sx={{
        background: "#fff"
      }}
      elevation={0}>
      <Grid container alignItems={'center'} paddingTop='10px' paddingBottom="50px"  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
        <Grid item>
          <img src={logo} width='100px' />
        </Grid>
        <Grid item >
          <Navigation />
        </Grid>
        <Grid item sx={{ flex: 1 }} textAlign='right'>
          <a
            href='tel:+916304400431'
            className='phone-number'
          >Book Appointment </a>
        </Grid>
      </Grid>

      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
          className="menuIcon"
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
          <Navigation />
        </Menu>
      </Box>
      {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} ><img src={logo} /></Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Navigation />
          </Box> */}
    </AppBar>
  );
}
export default AppBarComponent;
