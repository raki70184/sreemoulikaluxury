import React from "react";
import { useNavigate } from "react-router-dom";

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
import logo from "../images/Logo.png";
import "./AppBarComponent.css";

function AppBarComponent() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

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

  return (
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
        paddingTop="30px"
        paddingBottom={sm ? 1 : "50px"}
        paddingLeft={2}
        paddingRight={2}   //spacing for left and right
        justifyContent={sm ? "space-between" : "center"}
      >
        <Hidden smDown>
          <Grid item>
            <Navigation>
              {" "}
              <img
                src={logo}
                width="100px"
                onClick={() => navigate("/")}
                className="logo"
              />
            </Navigation>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid item>
            <img
              src={logo}
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
  );
}
export default AppBarComponent;
