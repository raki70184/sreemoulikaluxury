import * as React from "react";
import {
  Box,
  CssBaseline,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Icon
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Facebook, YouTube, Instagram, WhatsApp } from "@mui/icons-material";

export const Navigation = () => {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{
          background: "#fff"
        }}
        elevation={0}
      >
        <BottomNavigation
          showLabels
          value={value}
          sx={{
          background: "#fff"
        }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            value={value}
            onClick={() => navigate("/")}
          />
          <BottomNavigationAction
            label="About"
            value={value}
            onClick={() => navigate("/about")}
          />
          <BottomNavigationAction
            label="Services"
            value={value}
            onClick={() => navigate("/services")}
          />
          <BottomNavigationAction
            label="Contact"
            value={value}
            onClick={() => navigate("/contact")}
          />
          <BottomNavigationAction
            icon={<Icon component={Instagram} textRendering={'Instagram'}/>}
            target='_blank'
            href='https://www.instagram.com/sm.luxe.hyderabad'
          />
          <BottomNavigationAction
            label='+91-6304400431'
            target='_blank'
            href='tel:+916304400431'
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
