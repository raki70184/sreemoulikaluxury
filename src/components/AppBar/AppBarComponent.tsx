import React from "react";
import { useNavigate } from "react-router-dom";

import { AppBar, IconButton, Menu, MenuItem, Grid, Hidden, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import SMlogo from "../images/SMlogo.png";
import "./AppBarComponent.css";

function AppBarComponent() {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const navigate = useNavigate();

  const leftLinks = [
    { label: "ABOUT", to: "/about" },
    { label: "SERVICES", to: "/services" },
    { label: "GALLERY", to: "/gallery" },
  ];
  const rightLinks = [
    { label: "CAFE", to: "/cafe" },
    { label: "CONTACT", to: "/contact" },
  ];

  return (
    <>
      <AppBar
        position="absolute"
        className="topAppBar"
        elevation={0}
      >
        <Grid
          container
          alignItems={"center"}
          className="appBarStyle"
        >
          <Hidden smDown>
            <Grid item xs={5}>
              <Box className="navGroup leftGroup">
                {leftLinks.map((l) => (
                  <Button
                    key={l.to}
                    color="inherit"
                    className="navLink"
                    onClick={() => navigate(l.to)}
                  >
                    {l.label}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={2} textAlign="center">
              <img
                src={SMlogo}
                onClick={() => navigate("/")}
                className="logo centerLogo"
                alt="Sree Moulika"
              />
            </Grid>
            <Grid item xs={5}>
              <Box className="navGroup rightGroup" textAlign="right">
                {rightLinks.map((l) => (
                  <Button
                    key={l.to}
                    color="inherit"
                    className="navLink"
                    onClick={() => navigate(l.to)}
                  >
                    {l.label}
                  </Button>
                ))}
              </Box>
            </Grid>
          </Hidden>

          <Hidden smUp>
            <Grid item xs={6}>
              <img
                src={SMlogo}
                width="100px"
                onClick={() => navigate("/")}
                className="logo"
                alt="Sree Moulika"
              />
            </Grid>
            <Grid item xs={6} textAlign="right">
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
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {[
                  { label: "HOME", to: "/" },
                  ...leftLinks,
                  ...rightLinks,
                ].map((l) => (
                  <MenuItem
                    key={l.to}
                    onClick={() => {
                      navigate(l.to);
                      handleCloseNavMenu();
                    }}
                  >
                    {l.label}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Hidden>
        </Grid>
      </AppBar>
    </>
  );
}
export default AppBarComponent;
