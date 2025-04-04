import * as React from "react";
import { Box, CssBaseline, Paper, styled, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import MuiBottomNavigation from "@mui/material/BottomNavigation";

import "./Navigation.css";

const BottomNavigationAction = styled(MuiBottomNavigationAction)`
  color: green;
  &.Mui-selected {
    color: red;
  }
`;

const BottomNavigation = styled(MuiBottomNavigation)((props) => ({
  [props.theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    height: "auto",
  },
}));

interface NavigationProps {
  children?: React.ReactNode;
  onClose?: () => void;
}
export const Navigation: React.FC<NavigationProps> = (props: any) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Box ref={ref}>
      <CssBaseline />
      <Paper sx={{ bgcolor: "#efefef" }} elevation={0}>
        <BottomNavigation
          showLabels={true}
          value={value}
          className="navigation-wrapper"
          onChange={(event, newValue) => {
            setValue(newValue);
            props.onClose && props.onClose();
          }}
        >
          {props.children}
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
            label="Gallery"
            value={value}
            onClick={() => navigate("/gallery")}
          />
          <BottomNavigationAction
            label="Contact"
            value={value}
            onClick={() => navigate("/contact")}
          />
          <BottomNavigationAction
            label={sm ? "Book" : "call:9347238248"}
            value={value}
            className="callMe"
            onClick={() => window.open("tel:+91 9347238248")}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
