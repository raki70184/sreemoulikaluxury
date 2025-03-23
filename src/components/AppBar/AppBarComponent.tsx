import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  AppBar,
  IconButton,
  Menu,
  Grid,
  Hidden,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Navigation } from "../navigation";
import { Banner } from "../Banner";

import logo from "../images/Logo.png";
import SMlogo from "../images/SMlogo.png";
import "./AppBarComponent.css";

function AppBarComponent() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("lg"));

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "#efefef",
        }}
        elevation={0}
      >
        <Grid
          container
          alignItems={"center"}
          className="appBarStyle"
        >
          <Hidden smDown>
            <Grid item>
              <img
                src={SMlogo}
                onClick={() => navigate("/")}
                className="logo"
              />
            </Grid>
            <Grid item>
              <Navigation>
                {" "}
                {/* <img
                  src={SMlogo}
                  width="200px"
                  onClick={() => navigate("/")}
                  className="logo"
                /> */}
              </Navigation>
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid item>
              <img
                src={SMlogo}
                width="100px"
                onClick={() => navigate("/")}
                className="logo"
              />
            </Grid>
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
                <Navigation onClose={handleCloseNavMenu} />
              </Menu>
            </Grid>
          </Hidden>
        </Grid>
      </AppBar>
      {location.pathname === "/contact" && (
        <Banner title="Feel like having a chat or setting up an appointment? We're all ears and here to make it happen with a warm welcome!" />
      )}
      {location.pathname === "/services" && (
        <Banner title="Indulge in ultimate pampering with our extensive range of salon services" />
      )}
      {/* {location.pathname === "/gallery" && (
        // <Banner title="Coming Soon"></Banner>
      )} */}
    </>
  );
}
export default AppBarComponent;
