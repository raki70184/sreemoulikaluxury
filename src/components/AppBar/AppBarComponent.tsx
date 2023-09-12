import React from 'react';
import { AppBar, IconButton, Menu, Grid, Hidden } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Navigation } from "../navigation";
import logo from "../images/Logo.png";
import './AppBarComponent.css';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AppBarComponent() {
  
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Grid container alignItems={'center'} paddingTop='10px' paddingBottom={sm? 1 : "50px"} justifyContent={sm ? 'space-between' : ''}>
        <Grid item>
          <img src={logo} width='100px' />
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
