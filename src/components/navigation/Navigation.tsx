import * as React from "react";
import {
  Box,
  CssBaseline,
  BottomNavigation,
  Paper,
  Icon,
  styled
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import {Facebook, YouTube, Instagram, WhatsApp } from "@mui/icons-material";

import "./Navigation.css";

const BottomNavigationAction = styled(MuiBottomNavigationAction)`
  color: green;
  &.Mui-selected {
    color: red;
  }
`;

export const Navigation = () => {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Box ref={ref}>
      <CssBaseline />
      <Paper
        sx={{
          bgcolor: '#fff'
        }}
        elevation={0}
      >
        <BottomNavigation
          showLabels
          value={value}
          className='navigation-wrapper'
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
          {/* <BottomNavigationAction
            icon={<Icon component={Instagram} textRendering={'Instagram'}/>}
            target='_blank'
            href='https://www.instagram.com/sm.luxe.hyderabad'
          /> */}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
