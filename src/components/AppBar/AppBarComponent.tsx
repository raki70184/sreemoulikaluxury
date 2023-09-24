import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, IconButton, Menu, Grid, Hidden,useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Navigation } from "../navigation";
import logo from "../images/Logo.png";
import './AppBarComponent.css';

function AppBarComponent() {
  
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const navigate = useNavigate();

  return (
    <AppBar position="static"
      sx={{
        background: "#fff"
      }}
      elevation={0}>
      <Grid container alignItems={'center'} paddingTop='10px' paddingBottom={sm? 1 : "50px"} paddingLeft={2} paddingRight={2} justifyContent={sm ? 'space-between' : ''}>
        <Grid item>
         <img src={logo} width='200px' onClick={()=>navigate("/")} className='logo'/>
        </Grid>
        <Hidden smDown>
          <Grid item>
            <Navigation />
          </Grid>
          <Grid item sx={{ flex: 1 }} textAlign='right'>
            <a
              href='tel:+916304400431'
              className='telephone-number'
            >Book Appointment </a>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid item>
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
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Navigation onClose={handleCloseNavMenu} />
            </Menu>
          </Grid>
        </Hidden>
      </Grid>
    </AppBar>
  );
}
export default AppBarComponent;
